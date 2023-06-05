/**
 * @module utils/store
 * 
 * @file
 * This file provides the implementation of the `store` module, which is responsible for creating and managing 
 * stores in the state manager. Stores in the state manager are independent, isolated universes of cell states.
 * Each store acts as a multi-layered map from cells to states, allowing for efficient storage and retrieval of cell values.
 * 
 * The `store` module exposes functions to create new stores and interact with them.
 * A store provides a container for managing the state of cells, allowing read and write operations on cell values within its scope.
 * 
 * Stores are the primary units for organizing and managing state in the state manager.
 * The module aims to provide a structured and efficient approach to state management within isolated contexts.
 */

import type { Cell, WritableCell } from './cell';

type AnyValue = unknown;
type AnyError = unknown;
type AnyCell = Cell<AnyValue>;
type AnyWritableCell = WritableCell<AnyValue, unknown[], unknown>;
type OnUnmount = () => void;
type Getter = Parameters<AnyCell['read']>[0];
type Setter = Parameters<AnyWritableCell['write']>[1];

// Check if given cell has initial value
const hasInitialValue = <T extends Cell<AnyValue>>(cell: T): cell is T
    & (T extends Cell<infer Value> ? { init: Value } : never) => 'init' in cell;

const isActuallyWritableCell = (cell: AnyCell): cell is AnyWritableCell =>
    !!(cell as AnyWritableCell).write;

type CancelPromise = (next?: Promise<unknown>) => void;
const cancelPromiseMap = new WeakMap<Promise<unknown>, CancelPromise>();

// Register a promise and its cancellation function
const registerCancelPromise = (
    promise: Promise<unknown>,
    cancel: CancelPromise
) => {
    cancelPromiseMap.set(promise, cancel);
    promise.catch().finally(() => cancelPromiseMap.delete(promise));
}

const cancelPromise = (promise: Promise<unknown>, next?: Promise<unknown>) => {
    const cancel = cancelPromiseMap.get(promise);
    if (cancel) {
        cancelPromiseMap.delete(promise);
        cancel(next);
    }
}

type PromiseMeta<T> = {
    status?: 'pending' | 'fulfilled' | 'rejected';
    value?: T;
    reason?: AnyError;
    orig?: PromiseLike<T>;
}

const resolvePromise = <T>(promise: Promise<T> & PromiseMeta<T>, value: T) => {
    promise.status = 'fulfilled';
    promise.value = value;
}

const rejectPromise = <T>(
    promise: Promise<T> & PromiseMeta<T>,
    e: AnyError
) => {
    promise.status = 'rejected';
    promise.reason = e;
}

const isPromiseLike = (x: unknown): x is PromiseLike<unknown> =>
    typeof (x as any)?.then === 'function';

/**
 * Immutable map from a dependency to the dependency's cell state when it was last read.
 * Skip recomputation of a cell by comparing the cell state of each dependency to 
 * that dependencies's current revision.
 */
type Dependencies = Map<AnyCell, CellState>;
type NextDependencies = Map<AnyCell, CellState | undefined>;

/**
 * Immutable cell state,
 * tracked for both mounted and unmounted cells in a store.
 */
type CellState<Value = AnyValue> = {
    d: Dependencies
} & ({ e: AnyError } | { v: Value });

const isEqualCellValue = <Value>(a: CellState<Value>, b: CellState<Value>) =>
    'v' in a && 'v' in b && Object.is(a.v, b.v);

const isEqualCellError = <Value>(a: CellState<Value>, b: CellState<Value>) =>
    'e' in a && 'e' in b && Object.is(a.e, b.e);

const hasPromiseCellValue = <Value>(
    a: CellState<Value>
): a is CellState<Value> & { v: Value & Promise<unknown> } =>
    'v' in a && a.v instanceof Promise;

const isEqualPromiseCellValue = <Value>(
    a: CellState<Promise<Value> & PromiseMeta<Value>>,
    b: CellState<Promise<Value> & PromiseMeta<Value>>
) => 'v' in a && 'v' in b && a.v.orig && a.v.orig === b.v.orig;

const returnCellValue = <Value>(cellState: CellState<Value>): Value => {
    if ('e' in cellState) {
        throw cellState.e;
    }
    return cellState.v;
}

type Listeners = Set<() => void>;
type Dependents = Set<AnyCell>;

/**
 * State tracked for mounted cells. A cell is considered "mounted" if it has a
 * subscriber, or is a transitive dependency of another cell that has a subscriber.
 *
 * The mounted state of a cell is freed once it is no longer mounted.
 */
type Mounted = {
    /** The list of subscriber functions. */
    l: Listeners
    /** Cells that depend on *this* cell. Used to fan out invalidation. */
    t: Dependents
    /** Function to run when the cell is unmounted. */
    u?: OnUnmount
}

// for debugging purpose only
type StoreListener = (type: 'state' | 'sub' | 'unsub') => void;
type MountedCells = Set<AnyCell>;

/**
 * Create a new store. Each store is an independent, isolated universe of cell
 * states.
 *
 * Cells are not themselves state containers. When you read or write a
 * cell, that state is stored in a store. You can think of a Store like a
 * multi-layered map from cells to states, like this:
 *
 * ```
 * // Conceptually, a Store is a map from cells to states.
 * // The real type is a bit different.
 * type Store = Map<VersionObject, Map<Cell, CellState>>
 * ```
 *
 * @return A store.
 */
export const createStore = () => {
    const cellStateMap = new WeakMap<AnyCell, CellState>();
    const mountedMap = new WeakMap<AnyCell, Mounted>();
    const pendingMap = new Map<
        AnyCell,
        CellState /* prevCellState */ | undefined
    >();
    let storeListeners: Set<StoreListener>;
    let mountedCells: MountedCells;
    if (process.env.NODE_ENV !== 'production') {
        storeListeners = new Set();
        mountedCells = new Set();
    }

    const getCellState = <Value>(cell: Cell<Value>) =>
        cellStateMap.get(cell) as CellState<Value> | undefined;

    const setCellState = <Value>(
        cell: Cell<Value>,
        cellState: CellState<Value>
    ): void => {
        if (process.env.NODE_ENV !== 'production') {
            Object.freeze(cellState);
        }
        const prevCellState = cellStateMap.get(cell);
        cellStateMap.set(cell, cellState);
        if (!pendingMap.has(cell)) {
            pendingMap.set(cell, prevCellState);
        }
        if (prevCellState && hasPromiseCellValue(prevCellState)) {
            const next =
                'v' in cellState
                    ? cellState.v instanceof Promise
                        ? cellState.v
                        : Promise.resolve(cellState.v)
                    : Promise.reject(cellState.e)
            cancelPromise(prevCellState.v, next);
        }
    }

    const updateDependencies = <Value>(
        cell: Cell<Value>,
        nextCellState: CellState<Value>,
        nextDependencies: NextDependencies
    ): void => {
        const dependencies: Dependencies = new Map();
        let changed = false;
        nextDependencies.forEach((aState, a) => {
            if (!aState && a === cell) {
                aState = nextCellState;
            }
            if (aState) {
                dependencies.set(a, aState);
                if (nextCellState.d.get(a) !== aState) {
                    changed = true;
                }
            } else if (process.env.NODE_ENV !== 'production') {
                console.warn('[Bug] cell state not found');
            }
        });
        if (changed || nextCellState.d.size !== dependencies.size) {
            nextCellState.d = dependencies;
        }
    }

    const setCellValue = <Value>(
        cell: Cell<Value>,
        value: Value,
        nextDependencies?: NextDependencies
    ): CellState<Value> => {
        const prevCellState = getCellState(cell);
        const nextCellState: CellState<Value> = {
            d: prevCellState?.d || new Map(),
            v: value,
        };
        // updates dependencies if provided
        if (nextDependencies) {
            updateDependencies(cell, nextCellState, nextDependencies);
        }
        if (
            prevCellState &&
            isEqualCellValue(prevCellState, nextCellState) &&
            prevCellState.d === nextCellState.d
        ) {
            // bail out if value and deps haven't changed
            return prevCellState;
        }
        if (
            prevCellState &&
            hasPromiseCellValue(prevCellState) &&
            hasPromiseCellValue(nextCellState) &&
            isEqualPromiseCellValue(prevCellState, nextCellState)
        ) {
            if (prevCellState.d === nextCellState.d) {
                // bail out
                return prevCellState;
            } else {
                // restore the wrapped promise
                nextCellState.v = prevCellState.v;
            }
        }
        setCellState(cell, nextCellState);
        return nextCellState;
    }

    const setCellValueOrPromise = <Value>(
        cell: Cell<Value>,
        valueOrPromise: Value,
        nextDependencies?: NextDependencies,
        abortPromise?: () => void
    ): CellState<Value> => {
        if (isPromiseLike(valueOrPromise)) {
            let continuePromise: (next: Promise<Awaited<Value>>) => void;
            const promise: Promise<Awaited<Value>> & PromiseMeta<Awaited<Value>> =
                new Promise((resolve, reject) => {
                    let settled = false
                    valueOrPromise.then(
                        (v) => {
                            if (!settled) {
                                settled = true;
                                const prevCellState = getCellState(cell);
                                // update dependencies that could have changed
                                const nextCellState = setCellValue(
                                    cell,
                                    promise as Value,
                                    nextDependencies
                                );
                                resolvePromise(promise, v);
                                resolve(v as Awaited<Value>);
                                if (prevCellState?.d !== nextCellState.d) {
                                    mountDependencies(cell, nextCellState, prevCellState?.d);
                                }
                            }
                        },
                        (e) => {
                            if (!settled) {
                                settled = true;
                                const prevCellState = getCellState(cell);
                                // update dependencies that could have changed
                                const nextCellState = setCellValue(
                                    cell,
                                    promise as Value,
                                    nextDependencies
                                );
                                rejectPromise(promise, e);
                                reject(e);
                                if (prevCellState?.d !== nextCellState.d) {
                                    mountDependencies(cell, nextCellState, prevCellState?.d);
                                }
                            }
                        }
                    )
                    continuePromise = (next) => {
                        if (!settled) {
                            settled = true;
                            next.then(
                                (v) => resolvePromise(promise, v),
                                (e) => rejectPromise(promise, e)
                            )
                            resolve(next);
                        }
                    }
                });
            promise.orig = valueOrPromise as PromiseLike<Awaited<Value>>;
            promise.status = 'pending';
            registerCancelPromise(promise, (next) => {
                if (next) {
                    continuePromise(next as Promise<Awaited<Value>>);
                }
                abortPromise?.();
            })
            return setCellValue(cell, promise as Value, nextDependencies);
        }
        return setCellValue(cell, valueOrPromise, nextDependencies);
    }

    const setCellError = <Value>(
        cell: Cell<Value>,
        error: AnyError,
        nextDependencies?: NextDependencies
    ): CellState<Value> => {
        const prevCellState = getCellState(cell)
        const nextCellState: CellState<Value> = {
            d: prevCellState?.d || new Map(),
            e: error,
        }
        if (nextDependencies) {
            updateDependencies(cell, nextCellState, nextDependencies);
        }
        if (
            prevCellState &&
            isEqualCellError(prevCellState, nextCellState) &&
            prevCellState.d === nextCellState.d
        ) {
            // bail out
            return prevCellState;
        }
        setCellState(cell, nextCellState);
        return nextCellState;
    }

    const readCellState = <Value>(cell: Cell<Value>): CellState<Value> => {
        const cellState = getCellState(cell);
        if (cellState) {
            // Ensure that each cell is up to date.
            // Recursive calls to `readCellState(a)` will recompute `a` if
            // it's out of date thus increment its revision number if it changes.
            cellState.d.forEach((_, a) => {
                if (a !== cell && !mountedMap.has(a)) {
                    // Dependency is new or unmounted.
                    // Recomputing doesn't touch unmounted cells, need to recurse
                    // into this dependency in case it needs to update.
                    readCellState(a);
                }
            });
            // If a dependency changed since this cell was last computed,
            // then recompute is needed.
            if (
                Array.from(cellState.d).every(
                    ([a, s]) => a === cell || getCellState(a) === s
                )
            ) {
                return cellState;
            }
        }
        // Compute a new state for this cell.
        const nextDependencies: NextDependencies = new Map();
        let isSync = true;
        const getter: Getter = <V>(a: Cell<V>) => {
            if ((a as AnyCell) === cell) {
                const aState = getCellState(a);
                if (aState) {
                    nextDependencies.set(a, aState);
                    return returnCellValue(aState);
                }
                if (hasInitialValue(a)) {
                    nextDependencies.set(a, undefined);
                    return a.init;
                }
                // NOTE invalid derived cells can reach here
                throw new Error('no cell init');
            }
            // a !== cell
            const aState = readCellState(a);
            nextDependencies.set(a, aState);
            return returnCellValue(aState);
        }
        let controller: AbortController | undefined;
        let setSelf: ((...args: unknown[]) => unknown) | undefined;
        const options = {
            get signal() {
                if (!controller) {
                    controller = new AbortController();
                }
                return controller.signal;
            },
            get setSelf() {
                if (
                    process.env.NODE_ENV !== 'production' &&
                    !isActuallyWritableCell(cell)
                ) {
                    console.warn('setSelf function cannot be used with read-only cell');
                }
                if (!setSelf && isActuallyWritableCell(cell)) {
                    setSelf = (...args) => {
                        if (process.env.NODE_ENV !== 'production' && isSync) {
                            console.warn('setSelf function cannot be called in sync');
                        }
                        if (!isSync) {
                            return writeCell(cell, ...args);
                        }
                    }
                }
                return setSelf;
            },
        }
        try {
            const valueOrPromise = cell.read(getter, options as any);
            return setCellValueOrPromise(cell, valueOrPromise, nextDependencies, () =>
                controller?.abort()
            );
        } catch (error) {
            return setCellError(cell, error, nextDependencies);
        } finally {
            isSync = false;
        }
    }

    const readCell = <Value>(cell: Cell<Value>): Value =>
        returnCellValue(readCellState(cell));

    const addCell = (cell: AnyCell): Mounted => {
        let mounted = mountedMap.get(cell);
        if (!mounted) {
            mounted = mountCell(cell);
        }
        return mounted;
    }

    // FIXME doesn't work with mutually dependent cells
    const canUnmountCell = (cell: AnyCell, mounted: Mounted) =>
        !mounted.l.size &&
        (!mounted.t.size || (mounted.t.size === 1 && mounted.t.has(cell)));

    const delCell = (cell: AnyCell): void => {
        const mounted = mountedMap.get(cell);
        if (mounted && canUnmountCell(cell, mounted)) {
            unmountCell(cell);
        }
    }

    // Recompute, update dependency map and dirty map accordingly
    const recomputeDependents = (cell: AnyCell): void => {
        const dependencyMap = new Map<AnyCell, Set<AnyCell>>(); // tracks deps between calls
        const dirtyMap = new WeakMap<AnyCell, number>(); // tracks dirty count of each cell

        // Recursively traverse dependency tree
        const loop1 = (a: AnyCell) => {
            const mounted = mountedMap.get(a);
            mounted?.t.forEach((dependent) => {
                if (dependent !== a) {
                    // Add current cell as a dependency for dependent cell
                    dependencyMap.set(
                        dependent,
                        (dependencyMap.get(dependent) || new Set()).add(a)
                    );
                    dirtyMap.set(dependent, (dirtyMap.get(dependent) || 0) + 1);
                    loop1(dependent);
                }
            });
        }
        loop1(cell);

        // Recursively update dependents and check for changes
        const loop2 = (a: AnyCell) => {
            const mounted = mountedMap.get(a);
            mounted?.t.forEach((dependent) => {
                if (dependent !== a) {
                    let dirtyCount = dirtyMap.get(dependent);
                    if (dirtyCount) {
                        dirtyMap.set(dependent, --dirtyCount);
                    }
                    if (!dirtyCount) {
                        let isChanged = !!dependencyMap.get(dependent)?.size;
                        if (isChanged) {
                            const prevCellState = getCellState(dependent);
                            const nextCellState = readCellState(dependent);
                            isChanged =
                                !prevCellState ||
                                !isEqualCellValue(prevCellState, nextCellState);
                        }
                        if (!isChanged) {
                            // Remove the dependent cell from dependency set for all cells
                            dependencyMap.forEach((s) => s.delete(dependent));
                        }
                    }
                    loop2(dependent);
                }
            });
        }
        loop2(cell);
    }

    const writeCellState = <Value, Args extends unknown[], Result>(
        cell: WritableCell<Value, Args, Result>,
        ...args: Args
    ): Result => {
        let isSync = true;
        const getter: Getter = <V>(a: Cell<V>) => returnCellValue(readCellState(a));
        const setter: Setter = <V, As extends unknown[], R>(
            a: WritableCell<V, As, R>,
            ...args: As
        ) => {
            let r: R | undefined;
            if ((a as AnyWritableCell) === cell) {
                if (!hasInitialValue(a)) {
                    // NOTE technically possible but restricted as it may cause bugs
                    throw new Error('cell not writable');
                }
                const prevCellState = getCellState(a);
                const nextCellState = setCellValueOrPromise(a, args[0] as V);
                if (!prevCellState || !isEqualCellValue(prevCellState, nextCellState)) {
                    recomputeDependents(a);
                }
            } else {
                r = writeCellState(a as AnyWritableCell, ...args) as R;
            }
            if (!isSync) {
                flushPending();
            }
            return r as R;
        }
        const result = cell.write(getter, setter, ...args);
        isSync = false;
        return result;
    }

    const writeCell = <Value, Args extends unknown[], Result>(
        cell: WritableCell<Value, Args, Result>,
        ...args: Args
    ): Result => {
        const result = writeCellState(cell, ...args);
        flushPending();
        return result;
    }

    const mountCell = <Value>(
        cell: Cell<Value>,
        initialDependent?: AnyCell
    ): Mounted => {
        // mount self
        const mounted: Mounted = {
            t: new Set(initialDependent && [initialDependent]),
            l: new Set(),
        };
        mountedMap.set(cell, mounted);
        if (process.env.NODE_ENV !== 'production') {
            mountedCells.add(cell);
        }
        // mount dependencies before onMount
        readCellState(cell).d.forEach((_, a) => {
            const aMounted = mountedMap.get(a);
            if (aMounted) {
                aMounted.t.add(cell); // add dependent
            } else {
                if (a !== cell) {
                    mountCell(a, cell);
                }
            }
        });
        // recompute cell state
        readCellState(cell);
        // onMount
        if (isActuallyWritableCell(cell) && cell.onMount) {
            const onUnmount = cell.onMount((...args) => writeCell(cell, ...args));
            if (onUnmount) {
                mounted.u = onUnmount;
            }
        }
        return mounted;
    }

    const unmountCell = <Value>(cell: Cell<Value>): void => {
        // unmount self
        const onUnmount = mountedMap.get(cell)?.u;
        if (onUnmount) {
            onUnmount();
        }
        mountedMap.delete(cell);
        if (process.env.NODE_ENV !== 'production') {
            mountedCells.delete(cell);
        }
        // unmount dependencies afterward
        const cellState = getCellState(cell);
        if (cellState) {
            // cancel promise
            if (hasPromiseCellValue(cellState)) {
                cancelPromise(cellState.v);
            }
            cellState.d.forEach((_, a) => {
                if (a !== cell) {
                    const mounted = mountedMap.get(a);
                    if (mounted) {
                        mounted.t.delete(cell);
                        if (canUnmountCell(a, mounted)) {
                            unmountCell(a);
                        }
                    }
                }
            });
        } else if (process.env.NODE_ENV !== 'production') {
            console.warn('[Bug] could not find cell state to unmount', cell);
        }
    }

    const mountDependencies = <Value>(
        cell: Cell<Value>,
        cellState: CellState<Value>,
        prevDependencies?: Dependencies
    ): void => {
        const depSet = new Set(cellState.d.keys());
        prevDependencies?.forEach((_, a) => {
            if (depSet.has(a)) {
                // not changed
                depSet.delete(a);
                return;
            }
            const mounted = mountedMap.get(a);
            if (mounted) {
                mounted.t.delete(cell); // delete from dependents
                if (canUnmountCell(a, mounted)) {
                    unmountCell(a);
                }
            }
        });
        depSet.forEach((a) => {
            const mounted = mountedMap.get(a);
            if (mounted) {
                mounted.t.add(cell); // add to dependents
            } else if (mountedMap.has(cell)) {
                // mount dependencies only when cell is already mounted
                mountCell(a, cell);
            }
        });
    }

    /**
     * @function flushPending
     * 
     * @description
     * Flushes pending cell updates and triggers necessary actions.
     * This function iterates through the pendingMap, which contains
     * the cells with pending updates and their previous cell states.
     * 
     * It updates the dependencies, checks for changes in cell state,
     * and triggers listeners accordingly. If a cell has no state,
     * a warning is logged in non-production environments.
    */
    const flushPending = (): void => {
        while (pendingMap.size) {
            const pending = Array.from(pendingMap);
            pendingMap.clear();
            pending.forEach(([cell, prevCellState]) => {
                const cellState = getCellState(cell);

                // Update dependencies if necessary
                if (cellState) {
                    if (cellState.d !== prevCellState?.d) {
                        mountDependencies(cell, cellState, prevCellState?.d);
                    }

                    // Trigger listeners if cell state has changed
                    const mounted = mountedMap.get(cell);
                    if (mounted && !(
                        (
                            prevCellState
                            && !hasPromiseCellValue(prevCellState)
                            && (isEqualCellValue(prevCellState, cellState)
                                || isEqualCellError(prevCellState, cellState))
                        )
                    )) {
                        mounted.l.forEach((listener) => listener());
                    }
                } else if (process.env.NODE_ENV !== 'production') {
                    console.warn('[Bug] no cell state to flush');
                }
            });
        }

        // Notify store listeners of state changes
        if (process.env.NODE_ENV !== 'production') {
            storeListeners.forEach((l) => l('state'));
        }
    }

    /**
     * Subscribe to updates of a specific cell in the store.
     * When the cell value changes, the provided listener function
     * will be called. Returns a function to unsubscribe the listener.
     */
    const subscribeCell = (cell: AnyCell, listener: () => void) => {
        const mounted = addCell(cell);
        flushPending();
        const listeners = mounted.l;
        listeners.add(listener);
        if (process.env.NODE_ENV !== 'production') {
            storeListeners.forEach((l) => l('sub'));
        }
        return () => {
            listeners.delete(listener);
            delCell(cell);
            if (process.env.NODE_ENV !== 'production') {
                // devtools uses this to detect if it _can_ unmount or not
                storeListeners.forEach((l) => l('unsub'));
            }
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        return {
            get: readCell,
            set: writeCell,
            sub: subscribeCell,

            /**
             * Dev methods. Logic for store-related events for dev purposes.
             * Each method will retrieve data from store, e.g. - all mounted cells, 
             * current state of a specific cell, mounted state, etc..
             */
            dev_subscribe_store: (l: StoreListener) => {
                storeListeners.add(l);
                return () => {
                    storeListeners.delete(l);
                }
            },
            dev_get_mounted_cells: () => mountedCells.values(),
            dev_get_cell_state: (a: AnyCell) => cellStateMap.get(a),
            dev_get_mounted: (a: AnyCell) => mountedMap.get(a),
            // restores state of cells in store based on values,
            // useful for debug/testing
            dev_restore_cells: (values: Iterable<readonly [AnyCell, AnyValue]>) => {
                for (const [cell, valueOrPromise] of values) {
                    if (hasInitialValue(cell)) {
                        setCellValueOrPromise(cell, valueOrPromise);
                        recomputeDependents(cell);
                    }
                }
                flushPending();
            },
        }
    }
    return {
        get: readCell,
        set: writeCell,
        sub: subscribeCell,
    }
}

type Store = ReturnType<typeof createStore>;

let defaultStore: Store | undefined;

/**
 * Returns the default store in state manager.
 * If a default store doesn't exist, it creates a 
 * new store using `createStore` function and 
 * returns it.
 */
export const getDefaultStore = () => {
    if (!defaultStore) {
        defaultStore = createStore();
    }
    return defaultStore;
}



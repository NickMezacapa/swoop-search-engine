/**
 * @module hooks/useHydrateCell
 * 
 * @file
 * This file contains the `useHydrateCells` hook, which is responsible for hydrating cells with initial values.
 *
 * The `useHydrateCells` hook is used to initialize the state of writable cells in the state manager with provided values.
 * It ensures that cells are hydrated only once, preventing redundant updates. The hook leverages the `useStore` hook
 * from the `Provider` context to access the state manager's store and set cell values.
 *
 * The hook accepts an array or map of cell-value tuples as the `values` parameter. It iterates over the provided values,
 * checks if each cell has already been hydrated, and if not, adds it to the hydrated set and sets its initial value using
 * the store's `set` method.
 *
 * By using `useHydrateCells`, components can provide initial values for writable cells, allowing the state manager to
 * start with pre-existing values when the application loads.
 */

import { useStore } from '../contexts/Provider';
import type { WritableCell } from '../utils/cell';

type Store = ReturnType<typeof useStore>;
type Options = Parameters<typeof useStore>[0];
type AnyWritableCell = WritableCell<unknown, any[], any>;
type CellMap<A = AnyWritableCell, V = unknown> = Map<A, V>;
type CellTuple<A = AnyWritableCell, V = unknown> = readonly [A, V];
type InferCells<T extends Iterable<CellTuple>> = {
    [K in keyof T]: T[K] extends CellTuple<infer A>
    ? A extends AnyWritableCell
    ? CellTuple<A, ReturnType<A['read']>>
    : T[K]
    : never
};

const hydratedMap: WeakMap<Store, WeakSet<AnyWritableCell>> = new WeakMap();

/**
 * @function useHydrateCells
 * 
 * @description Hydrates writable cells with initial values.
 * 
 * @param values - An array or map of cell-value tuples representing the cells and their initial values.
 * @param options - Optional object to customize the behavior of the `useStore` hook.
 * 
 * @example
 * ```tsx
 * const nameCell = cell('foo');
 * const ageCell = cell(30);
 * 
 * const MyComponent = () => {
 *   useHydrateCells([
 *     [nameCell, 'bar'],
 *     [ageCell, 50],
 *   ]);
 * 
 *   // more component code...
 * };
 * ```
 */
export function useHydrateCells<T extends Array<CellTuple>>(
    values: InferCells<T>,
    options?: Options
): void;

export function useHydrateCells<T extends CellMap>(
    values: T,
    options?: Options
): void;

export function useHydrateCells<T extends Iterable<CellTuple>>(
    values: InferCells<T>,
    options?: Options
): void;

export function useHydrateCells<T extends Iterable<CellTuple>>(
    values: InferCells<T>,
    options?: Options
) {
    const store = useStore(options);

    const hydratedSet = getHydratedSet(store);
    for (const [cell, value] of values) {
        if (!hydratedSet.has(cell)) {
            hydratedSet.add(cell);
            store.set(cell, value);
        }
    }
};

const getHydratedSet = (store: Store) => {
    let hydratedSet = hydratedMap.get(store);
    if (!hydratedSet) {
        hydratedSet = new WeakSet();
        hydratedMap.set(store, hydratedSet);
    }
    return hydratedSet;
};

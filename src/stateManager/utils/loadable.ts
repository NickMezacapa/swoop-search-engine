/**
 * @module utils/loadable
 * @file This file contains logic that encapsulates the loading state.
 * 
 * 
 * @function loadable
 * @description
 * Creates a loadable cell that encapsulates the loading state, error state, and loaded data state.
 * It handles the logic of managing and caching loadable states based on promises.
 * 
 * @template Value - The type of the value stored in the cell.
 * @param {Cell<Value>} cellInstance - The cell instance to create a loadable cell from.
 * @return {Cell<Loadable<Value>>} - The loadable cell.
 * 
 * @example
 * ```tsx
 * // Create a store using custom state manager
 * const store = createStore();
 * 
 * // Create a loadable cell
 * const dataCell = loadable(store.cell(0));
 * ```
 */

import { cell } from './cell';
import type { Cell } from './cell';

const cache1 = new WeakMap();
const memo1 = <T>(create: () => T, dep1: object): T =>
    (cache1.has(dep1) ? cache1 : cache1.set(dep1, create())).get(dep1); // cache stores loadable states based on promises

export type Loadable<Value> =
    | { state: 'loading' }
    | { state: 'hasError'; error: unknown }
    | { state: 'hasData'; data: Awaited<Value> }

const LOADING: Loadable<unknown> = { state: 'loading' };

export function loadable<Value>(cellInstance: Cell<Value>): Cell<Loadable<Value>> {
    return memo1(() => {
        const loadableCache = new WeakMap<Promise<void>, Loadable<Value>>();
        const refreshCell = cell(0); // used for refreshing loadable cell

        if (process.env.NODE_ENV !== 'production') refreshCell.debugPrivate = true;

        const derivedCell = cell(
            (get, { setSelf }) => {
                // Retrieve the refreshCell value to trigger updates
                get(refreshCell);

                const promise = get(cellInstance);

                // Check if promise has already resolved to a value
                if (!(promise instanceof Promise)) {
                    return { state: 'hasData', data: promise } as Loadable<Value>;
                }

                const cached = loadableCache.get(promise);
                if (cached) return cached;

                // Cache the promise's loadable state as loading
                loadableCache.set(promise, LOADING as Loadable<Value>);
                promise
                    .then(
                        (data) => {
                            loadableCache.set(promise, { state: 'hasData', data });
                        },
                        (error) => {
                            loadableCache.set(promise, { state: 'hasError', error });
                        }
                    )
                    .finally(setSelf);

                return LOADING as Loadable<Value>;
            },
            (_get, set) => {
                // Update refreshCell value to trigger cell updates
                set(refreshCell, (c) => c + 1);
            }
        );

        if (process.env.NODE_ENV !== 'production') {
            derivedCell.debugPrivate = true;
        }

        return cell((get) => get(derivedCell));
    }, cellInstance);
};

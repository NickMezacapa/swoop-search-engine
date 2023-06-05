/**
 * @module hooks/useCellValue
 * 
 * @file
 * This file contains the custom hook `useCellValue` for accessing the value of a cell within the state manager.
 * It utilizes React's experimental APIs and React's built-in hooks to manage the state and subscriptions.
 * 
 * The hook subscribes to changes in the cell's value and triggers rerendering when necessary.
 * It also supports delaying rerendering, allowing for asynchronous updates.
 * `useCellValue` is used to read the value of a cell within a component hierarchy.
 */

/// <reference types="react/experimental" />

import ReactExports, { useDebugValue, useEffect, useReducer } from 'react';
import type { ReducerWithoutAction } from 'react';

import { useStore } from '../contexts/Provider';
import type { Cell } from '../utils/cell';
import type { ExtractCellValue } from '../utils/types';

type Store = ReturnType<typeof useStore>;

const isPromiseLike = (x: unknown): x is PromiseLike<unknown> =>
    typeof (x as any)?.then === 'function';

const use =
    ReactExports.use ||
    (<T>(
        promise: PromiseLike<T> & {
            status?: 'pending' | 'fulfilled' | 'rejected';
            value?: T;
            reason?: unknown;
        }
    ): T => {
        if (promise.status === 'pending') {
            throw promise;
        } else if (promise.status === 'fulfilled') {
            return promise.value as T;
        } else if (promise.status === 'rejected') {
            throw promise.reason;
        } else {
            promise.status = 'pending';
            promise.then(
                (v) => {
                    promise.status = 'fulfilled';
                    promise.value = v;
                },
                (e) => {
                    promise.status = 'rejected';
                    promise.reason = e;
                }
            )
            throw promise;
        }
    });

type Options = {
    store?: Store
    delay?: number
};

/**
 * @function useCellValue
 * 
 * @description
 * The hook subscribes to changes in the cell's value and triggers rerendering when necessary.
 * It also supports delaying rerendering, allowing for asynchronous updates. `useCellValue` is 
 * used to read the value of a cell within a component hierarchy.
 * 
 * @param {Cell} cell - The cell whose value needs to be accessed.
 * @param {Options} [options] - Optional config options.
 * @return {Value} The value of the cell.
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const cellValue = useCellValue(myCell);
 *   return <div>{cellValue}</div>
 * };
 * ```
 */
export function useCellValue<Value>(
    cell: Cell<Value>,
    options?: Options
): Awaited<Value>;

export function useCellValue<CellType extends Cell<any>>(
    cell: CellType,
    options?: Options
): Awaited<ExtractCellValue<CellType>>;

export function useCellValue<Value>(cell: Cell<Value>, options?: Options) {
    const store = useStore(options);

    // Use reducer to track and update the cell value
    const [[valueFromReducer, storeFromReducer, cellFromReducer], rerender] =
        useReducer<
            ReducerWithoutAction<readonly [Value, Store, typeof cell]>,
            undefined
        >(
            (prev) => {
                const nextValue = store.get(cell);
                if (
                    Object.is(prev[0], nextValue) &&
                    prev[1] === store &&
                    prev[2] === cell
                ) {
                    return prev;
                }
                return [nextValue, store, cell];
            },
            undefined,
            () => [store.get(cell), store, cell]
        );

    let value = valueFromReducer;
    if (storeFromReducer !== store || cellFromReducer !== cell) {
        rerender();
        value = store.get(cell);
    }

    const delay = options?.delay;

    useEffect(() => {
        const unsub = store.sub(cell, () => {
            if (typeof delay === 'number') {
                // delay rerendering to wait a promise possibly to resolve
                setTimeout(rerender, delay);
                return;
            }
            rerender(); // rerender triggers if the store or cell has changed
        });
        rerender();
        return unsub;
    }, [store, cell, delay]);

    useDebugValue(value);

    return isPromiseLike(value) ? use(value) : (value as Awaited<Value>);
};

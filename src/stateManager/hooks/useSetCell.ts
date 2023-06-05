/**
 * @module hooks/useSetCell
 * 
 * @file
 * This file contains the `useSetCell` hook, which is used to create a setter 
 * function for a writable cell in the state manager. 
 * 
 * The `useSetCell` hook is used within components to update the value of a 
 * writable cell by invoking the returned setter function with the desired arguments.
 * 
 * The hook supports both specific cell types and dynamically extracted cell types
 * based on the provided arguments. The setter function internally uses the 
 * `set` method of the store to update the cell's value.
 */

import { useCallback } from 'react';
import { useStore } from '../contexts/Provider';

import type { ExtractCellArgs, ExtractCellResult } from '../utils/types';
import type { WritableCell } from '../utils/cell';

type SetCell<Args extends any[], Result> = (...args: Args) => Result;
type Store = ReturnType<typeof useStore>;

type Options = {
    store?: Store
};

/**
 * @function useSetCell
 * 
 * @description 
 * Custom hook used within components to update the
 * value of a writable cell by invoking the returned setter 
 * function with the desired arguments. Uses the `set` method  
 * of the state store to update the value of the specified cell.
 * 
 * @template Value - The value type of the writable cell.
 * @template Args - The argument types of the setter function.
 * @template Result - The return type of the setter function.
 * 
 * @param {WritableCell<Value, Args, Result>} cell - The writable cell to set the value for.
 * @param {Options} [options] - Optionals for customizing the store used by the hook.
 * 
 * @return {SetCell<Args, Result>} The setter function that updates the value of the cell.
 * 
 * @example
 * ```tsx
 * // Create a cell
 * const countCell = cell(0);
 * 
 * // Define a component that uses `useSetCell`
 * const Counter = () => {
 *   const setCount = useSetCell(countCell);
 *   // ... additional component logic
 * };
 * ```
 */
export function useSetCell<Value, Args extends any[], Result>(
    cell: WritableCell<Value, Args, Result>,
    options?: Options
): SetCell<Args, Result>

export function useSetCell<CellType extends WritableCell<any, any[], any>>(
    cell: CellType,
    options?: Options
): SetCell<ExtractCellArgs<CellType>, ExtractCellResult<CellType>>

export function useSetCell<Value, Args extends any[], Result>(
    cell: WritableCell<Value, Args, Result>,
    options?: Options
) {
    const store = useStore(options);
    const setCell = useCallback(
        (...args: Args) => {
            if (process.env.NODE_ENV !== 'production' && !('write' in cell)) {
                // useCell can pass non writable cell with wrong type assertion, need to check.
                throw new Error('not writable cell');
            }
            return store.set(cell, ...args);
        },
        [store, cell]
    );
    return setCell;
}

/**
 * @module hooks/useCell
 * 
 * @file
 * This file contains the `useCell` hook, which provides a unified interface for working with cells within 
 * the state manager. It combines the functionalities of `useCellValue` and `useSetCell` hooks, allowing 
 * components to read the value of a cell and update it if the cell is writable. This hook simplifies the
 * usage of cells by abstracting away the differences between read-only and writable cells.
 *
 * The `useCell` hook supports different types of cells and provides a consistent return value
 * based on the type of the cell.
 *
 * This file exports the `useCell` function, which takes a cell and optional options as arguments
 * and returns a tuple containing the cell value and a setter function for updating the cell value,
 * if the cell is writable.
 *
 * The `useCell` hook is an essential part of the state manager and allows components to seamlessly
 * interact with the state using cells.
 * 
 * @summary `useCell` is a hook for working with cells within the state manager, combining read/write operations.
 */

import { useCellValue } from './useCellValue';
import { useSetCell } from './useSetCell';

import type { Cell, WritableCell } from '../utils/cell';
import type {
    ExtractCellArgs,
    ExtractCellResult,
    ExtractCellValue
} from '../utils/types';

type SetCell<Args extends any[], Result> = (...args: Args) => Result;

type Options = Parameters<typeof useCellValue>[1];

/**
 * @function useCell
 * 
 * @description Hook for working with cells within the state manager, combining read/write operations.
 * 
 * @template Value - The type of the cell value.
 * @template Args - The type of the arguments for the writable cell.
 * @template Result - The type of the result for the writable cell. 
 * 
 * @param {Cell<Value> | WritableCell<Value, Args, Result>} cell - The cell being accessed/updated.
 * @param {Options} [options] - Optionals for customizing the behavior of the hook.
 * @return {[Awaited<Value>, SetCall<Args, Result>]} - Tuple containing the cell value and a setter function.
 * 
 * @example
 * ```tsx
 * // Create a cell
 * const nameCell = cell('foo');
 * 
 * // Define a component that uses `useCell`
 * const MyComponent = () => {
 *   const [name, setName] = useCell(nameCell);
 *   // ... additional component logic
 * };
 * ```
 */
export function useCell<Value, Args extends any[], Result>(
    cell: WritableCell<Value, Args, Result>,
    options?: Options
): [Awaited<Value>, SetCell<Args, Result>];

export function useCell<Value>(
    cell: Cell<Value>,
    options?: Options
): [Awaited<Value>, never];

export function useCell<CellType extends WritableCell<any, any[], any>>(
    cell: CellType,
    options?: Options
): [
        Awaited<ExtractCellValue<CellType>>,
        SetCell<ExtractCellArgs<CellType>, ExtractCellResult<CellType>>
    ];

export function useCell<CellType extends Cell<any>>(
    cell: CellType,
    options?: Options
): [Awaited<ExtractCellValue<CellType>>, never];

export function useCell<Value, Args extends any[], Result>(
    cell: Cell<Value> | WritableCell<Value, Args, Result>,
    options?: Options
) {
    return [
        useCellValue(cell, options),
        useSetCell(cell as WritableCell<Value, Args, Result>, options),
    ];
};




/**
 * @module hooks/useResetCell
 * @file This file contains the logic for the `useResetCell` hook.
 * 
 * 
 * @function useResetCell
 * @description
 * The `useResetCell` hook is used to create a reset function for a specific writable cell instance. 
 * It internally uses the `useSetCell` hook to obtain the setter function for the cell instance. The
 * reset function can then be called to reset the value of the cell to its initial state or a predefined value.
 * 
 * @param {WritableCell<unknown, [typeof RESET], unknown>} cellInstance - The cell instance to reset.
 * @param {Options} [options] - Optionals to customize the behavior of the underlying `useSetCell` hook.
 * @return {() => void} The reset function that can be called to reset the cell value.
 * 
 * @example
 * ```tsx
 * const countCell = cell(100);
 * 
 * function MyComponent() {
 *   const countCell = useCell(countCell);
 *   const resetCount = useResetCell(countCell);
 * 
 *   const handleReset = () => resetCount(); // reset the count value to initial state
 * 
 *   // ... more component code
 * };
 * ```
 */

import { useCallback } from 'react';

import { useSetCell } from './useSetCell';
import type { WritableCell } from '../utils/cell';

const RESET = Symbol();

type Options = Parameters<typeof useSetCell>[1];

export function useResetCell(
    cellInstance: WritableCell<unknown, [typeof RESET], unknown>,
    options?: Options
) {
    const setCell = useSetCell(cellInstance, options);
    const resetCell = useCallback(() => setCell(RESET), [setCell]);
    return resetCell;
};

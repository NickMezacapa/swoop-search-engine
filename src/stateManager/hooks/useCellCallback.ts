/**
 * @module hooks/useCellCallback
 * @file This file contains the logic for the `useCellCallback` custom hook.
 * 
 * 
 * @function useCellCallback
 * @description
 * A custom hook that creates a cell-backed callback function. 
 * The callback function is created with a getter, setter, and provided arguments. 
 * The hook returns the created callback function.
 * 
 * @param {Function} callback - The callback to be invoked with a getter, setter, and additional args.
 * @param {Options} [options] - Optionals to customize the behavior of the hook.
 * @return {Function} The created callback function.
 */

import { useMemo } from 'react';
import { useSetCell } from './useSetCell';
import { cell } from '../utils/cell';
import type { Getter, Setter } from '../utils/types';

type Options = Parameters<typeof useSetCell>[1];

export function useCellCallback<Result, Args extends unknown[]>(
    callback: (get: Getter, set: Setter, ...arg: Args) => Result,
    options?: Options
): (...args: Args) => Result {
    const cellInstance = useMemo(
        () => cell(null, (get, set, ...args: Args) => callback(get, set, ...args)),
        [callback]
    );
    return useSetCell(cellInstance, options);
};

/**
 * @module arrangements/cellWithDefault
 * @file This file contains logic for creating a writable cell with a default value.
 * 
 * 
 * @function cellWithDefault
 * @description
 * The `cellWithDefault` function is used to create a writable cell with a default value. 
 * It takes a `getDefault` function as an argument, which provides the default value for the cell. 
 * The `getDefault` function is called with the current value and options as arguments and returns the default value. 
 * The function returns a writable cell that can be used to access and modify the cell's value.
 * The function can return a promise for an asynchronous default value.
 * 
 * @template {Value} Value - The type of the cell's value.
 * @param {Read<Value, [SetStateAction<Awaited<Value>> | typeof RESET], void>} getDefault - The function providing the default value.
 * @return {WritableCell<Promise<Value> | Value, [SetStateAction<Awaited<Value>> | typeof RESET], void | Promise<void>>} The created writable cell with default value.
 * 
 * @example
 * ```tsx
 * const initialValue = 0;
 * const countCell = cellWithDefault(() => initialValue);
 * const count = useCell(countCell); // Access the value of the cell
 * const setCount = useSetter(countCell); // Access setter fn to modify state
 * setCount((prev) => prev + 1); // Update with setter function
 * ```
 * @example
 * ```tsx
 * const initialValue = { name: 'foo', age: 30 };
 * const userCell = cellWithDefault(() => initialValue);
 * const user = useCell(userCell); // Access the value of the cell
 * const setUser = useSetter(userCell); // Access setter fn to modify state
 * setUser(prev => ({ ...prev, name: 'bar' })); // Update with setter. Only triggers re-render if new value differs from prev
 * ```
 */

import { cell } from '../utils/cell';
import type { WritableCell } from '../utils/cell';
import type { SetStateAction } from '../utils/types';

const RESET = Symbol();

type Read<Value, Args extends unknown[], Result> = WritableCell<
    Value,
    Args,
    Result
>['read'];

const updateValue = <Value>(
    prevValue: Value,
    update: SetStateAction<Value>
): Value =>
    typeof update === 'function'
        ? (update as (prev: Value) => Value)(prevValue)
        : update;

export function cellWithDefault<Value>(
    getDefault: Read<
        Promise<Value>,
        [SetStateAction<Awaited<Value>> | typeof RESET],
        void
    >
): WritableCell<
    Promise<Value> | Value,
    [SetStateAction<Awaited<Value>> | typeof RESET],
    void | Promise<void>
>;

export function cellWithDefault<Value>(
    getDefault: Read<Value, [SetStateAction<Awaited<Value>> | typeof RESET], void>
): WritableCell<Value, [SetStateAction<Awaited<Value>> | typeof RESET], void>;

export function cellWithDefault<Value>(
    getDefault: Read<Value, [SetStateAction<Awaited<Value>> | typeof RESET], void>
) {
    const EMPTY = Symbol();
    const overwrittenCell = cell<Value | typeof EMPTY>(EMPTY);

    if (process.env.NODE_ENV !== 'production') {
        overwrittenCell.debugPrivate = true;
    }

    const cellInstance: WritableCell<
        Value,
        [SetStateAction<Awaited<Value>> | typeof RESET],
        void | Promise<void>
    > = cell(
        (get, options) => {
            const overwritten = get(overwrittenCell);
            if (overwritten !== EMPTY) {
                return overwritten;
            }
            return getDefault(get, options);
        },
        (get, set, update) => {
            if (update === RESET) {
                return set(overwrittenCell, EMPTY);
            }
            const prevValue = get(cellInstance)
            if (prevValue instanceof Promise) {
                return prevValue.then((v) =>
                    set(overwrittenCell, updateValue(v, update))
                );
            }
            return set(
                overwrittenCell,
                updateValue(prevValue as Awaited<Value>, update)
            );
        }
    );
    return cellInstance;
};


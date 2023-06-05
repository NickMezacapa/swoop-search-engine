/**
 * @module arrangements/cellWithReducer
 * @file This file contains the logic to create a writable cell with reducer fn to manage state value.
 * 
 * 
 * @function cellWithReducer
 * @description
 * Creates a writable cell instance with a reducer function to manage the state value.
 * The `cellWithReducer` function accepts an `initialValue` and a `reducer` function.
 * The `reducer` function takes the current state value and an action as parameters and returns the 
 * updated state value based on the action. The cell instance internally manages the state value and 
 * automatically updates it by calling the reducer function whenever an action is dispatched using the 
 * cell's setter function.
 * 
 * @template {Value} Value - The type of the the state value.
 * @template {Action} Action - The type of the actions that can be dispatched to the reducer.
 * @param {Value} initialValue - The initial value of the state.
 * @param {(value: Value, action: Action) => Value} reducer - The reducer function that updates the state value based on actions.
 * @return {WritableCell<Value, [Action?], void>} - The writable cell instance.
 * 
 * @example
 * ```tsx
 *  * const initialState = { count: 0 };
 *
 * const increment = { type: 'INCREMENT' };
 * const decrement = { type: 'DECREMENT' };
 *
 * const counterCell = cellWithReducer(initialState, (state, action) => {
 *   switch (action.type) {
 *     case 'INCREMENT':
 *       return { count: state.count + 1 };
 *     case 'DECREMENT':
 *       return { count: state.count - 1 };
 *     default:
 *       return state;
 *   }
 * });
 *
 * const counter = useCell(counterCell); // Access the value of the cell
 * const dispatch = useSetter(counterCell); // Access setter function to dispatch actions
 *
 * dispatch(increment); // Dispatch an action to increment the count
 * dispatch(decrement); // Dispatch an action to decrement the count
 * ```
 */

import { cell } from '../utils/cell';
import type { WritableCell } from '../utils/cell';

export function cellWithReducer<Value, Action>(
    initialValue: Value,
    reducer: (value: Value, action?: Action) => Value
): WritableCell<Value, [Action?], void>;

export function cellWithReducer<Value, Action>(
    initialValue: Value,
    reducer: (value: Value, action: Action) => Value
): WritableCell<Value, [Action], void>;

export function cellWithReducer<Value, Action>(
    initialValue: Value,
    reducer: (value: Value, action: Action) => Value
) {
    const cellInstance: any = cell(initialValue, (get, set, action: Action) =>
        set(cellInstance, reducer(get(cellInstance), action))
    );
    return cellInstance;
}

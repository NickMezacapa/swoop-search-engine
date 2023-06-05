/**
 * @module hooks/useReducerCell
 * @file This file contains the logic for the `useReducerCell` hook.
 * 
 * 
 * @function useReducerCell
 * @description
 * The `useReducerCell` hook is used to manage a primitive cell within the state manager using a reducer function.
 * It combines the functionality of the `useCell` hook with the reducer pattern commonly used in state management.
 * The hook returns the current state value of the cell and a dispatch function for updating the state based on actions.
 * The reducer function is responsible for transforming the current state based on the dispatched action.
 * 
 * @param {PrimitiveCell<Value>} cellInstance - The primitive cell instance to manage.
 * @param {(value: ValueAnimationOptions, action?: Action) => Value} reducer - The reducer function.
 * @param {Options} [options] - Optional object for configuring the cell behavior.
 * @return {[ValueAnimationOptions, (action?: Action) => void]} A tuple containing the current state value and dispatch fn.
 * 
 * 
 * @link https://react.dev/reference/react/useReducer
 */

import { useCallback } from 'react';
import { useCell } from './useCell';
import type { PrimitiveCell } from '../utils/cell';

type Options = Parameters<typeof useCell>[1];

export function useReducerCell<Value, Action>(
    cellInstance: PrimitiveCell<Value>,
    reducer: (v: Value, a?: Action) => Value,
    options?: Options
): [Value, (action?: Action) => void];

export function useReducerCell<Value, Action>(
    cellInstance: PrimitiveCell<Value>,
    reducer: (v: Value, a: Action) => Value,
    options?: Options
): [Value, (action: Action) => void];

export function useReducerCell<Value, Action>(
    cellInstance: PrimitiveCell<Value>,
    reducer: (v: Value, a: Action) => Value,
    options?: Options
) {
    const [state, setState] = useCell(cellInstance, options);
    const dispatch = useCallback(
        (action: Action) => {
            setState((prev) => reducer(prev, action));
        },
        [setState, reducer]
    );
    return [state, dispatch];
};

import { cell } from '../utils/cell';
import type { WritableCell } from '../utils/cell';

const RESET = Symbol();

type SetStateActionWithReset<Value> =
    | Value
    | typeof RESET
    | ((prev: Value) => Value | typeof RESET);

export function cellWithReset<Value>(initialValue: Value) {
    type Update = SetStateActionWithReset<Value>;
    const cellInstance = cell<Value, [Update], void>(
        initialValue,
        (get, set, update) => {
            const nextValue =
                typeof update === 'function'
                    ? (update as (prev: Value) => Value | typeof RESET)(get(cellInstance))
                    : update;

            set(cellInstance, nextValue === RESET ? initialValue : nextValue);
        }
    );
    return cellInstance as WritableCell<Value, [Update], void>;
}

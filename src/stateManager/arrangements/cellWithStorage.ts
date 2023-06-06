/**
 * @module arrangements/cellWithStorage
 * @file This file contains the logic to create a writable cell with storage integration
 * 
 * 
 * @function cellWithStorage
 * @description
 * The `cellWithStorage` hook creates a writable cell that integrates with storage. It allows you to store 
 * and retrieve the cell value from a storage medium, such as `localStorage` or an asynchronous storage API,
 * ensuring persistence of state across refresh. The writable cell instance returned by this hook can be used 
 * to access and update the stored value. The value is automatically stored in the storage whenever it is updated.
 * If the storage object supports subscription, the cell will automatically subscribe to storage events and update 
 * its value when the value changes in another tab or window.
 * 
 * @template {Value} Value - The type of value stored in the cell.
 * @param {Value} initialValue - The initial value of the cell.
 * @param {SyncStorage<Value> | AsyncStorage<Value>} [storage] - The storage object used for reading and writing the value.
 * @return {WritableCell<Value, [SetStateActionWithReset<Value>], void>} - The writable cell instance.
 * 
 * @example
 * ```typescript
 * // Create a cell with storage integration
 * const myCell = cellWithStorage('myKey', 'initialValue');
 * 
 * // Access the value
 * const value = useCell(myCell);
 * 
 * // Update the value
 * const setValue = useSetCell(myCell);
 * setValue('foo');
 * 
 * // The value is automatically stored in the storage.
 * ```
 * @example
 * ```typescript
 * const storage = createJSONStorage(() => sessionStorage); 
 * const anyCell = cellWithStorage('storageKey', initialValue, storage);
 * ```
 */

import { cell } from '../utils/cell';
import type { WritableCell } from '../utils/cell';

const RESET = Symbol();

const isPromiseLike = (x: unknown): x is PromiseLike<unknown> =>
    typeof (x as any)?.then === 'function';

type Unsubscribe = () => void;

type SetStateActionWithReset<Value> =
    | Value
    | typeof RESET
    | ((prev: Value) => Value | typeof RESET);

export interface AsyncStorage<Value> {
    getItem: (key: string, initialValue: Value) => PromiseLike<Value>
    setItem: (key: string, newValue: Value) => PromiseLike<void>
    removeItem: (key: string) => PromiseLike<void>
    subscribe?: (
        key: string,
        callback: (value: Value) => void,
        initialValue: Value
    ) => Unsubscribe
}

export interface SyncStorage<Value> {
    getItem: (key: string, initialValue: Value) => Value
    setItem: (key: string, newValue: Value) => void
    removeItem: (key: string) => void
    subscribe?: (
        key: string,
        callback: (value: Value) => void,
        initialValue: Value
    ) => Unsubscribe
}

export interface AsyncStringStorage {
    getItem: (key: string) => PromiseLike<string | null>
    setItem: (key: string, newValue: string) => PromiseLike<void>
    removeItem: (key: string) => PromiseLike<void>
}

export interface SyncStringStorage {
    getItem: (key: string) => string | null
    setItem: (key: string, newValue: string) => void
    removeItem: (key: string) => void
}

export function createJSONStorage<Value>(
    getStringStorage: () => AsyncStringStorage
): AsyncStorage<Value>;

export function createJSONStorage<Value>(
    getStringStorage: () => SyncStringStorage
): SyncStorage<Value>;

export function createJSONStorage<Value>(
    getStringStorage: () => AsyncStringStorage | SyncStringStorage | undefined
): AsyncStorage<Value> | SyncStorage<Value> {
    let lastStr: string | undefined;
    let lastValue: any;
    const storage: AsyncStorage<Value> | SyncStorage<Value> = {
        getItem: (key, initialValue) => {
            const parse = (str: string | null) => {
                str = str || '';
                if (lastStr !== str) {
                    try {
                        lastValue = JSON.parse(str);
                    } catch {
                        return initialValue;
                    }
                    lastStr = str;
                }
                return lastValue;
            };
            const str = getStringStorage()?.getItem(key) ?? null;
            if (isPromiseLike(str)) {
                return str.then(parse);
            }
            return parse(str);
        },
        setItem: (key, newValue) =>
            getStringStorage()?.setItem(key, JSON.stringify(newValue)),
        removeItem: (key) => getStringStorage()?.removeItem(key),
    };
    if (
        typeof window !== 'undefined' &&
        typeof window.addEventListener === 'function'
    ) {
        storage.subscribe = (key, callback, initialValue) => {
            if (!(getStringStorage() instanceof window.Storage)) {
                return () => { };
            }
            const storageEventCallback = (e: StorageEvent) => {
                if (e.storageArea === getStringStorage() && e.key === key) {
                    let newValue: Value;
                    try {
                        newValue = JSON.parse(e.newValue || '');
                    } catch {
                        newValue = initialValue;
                    }
                    callback(newValue);
                }
            };
            window.addEventListener('storage', storageEventCallback);
            return () => {
                window.removeEventListener('storage', storageEventCallback);
            };
        };
    };
    return storage;
};

const defaultStorage = createJSONStorage(() =>
    typeof window !== 'undefined'
        ? window.localStorage
        : (undefined as unknown as Storage)
);

export function cellWithStorage<Value>(
    key: string,
    initialValue: Value,
    storage:
        | SyncStorage<Value>
        | AsyncStorage<Value> = defaultStorage as SyncStorage<Value>
): WritableCell<Value, [SetStateActionWithReset<Value>], void> {
    const baseCell = cell(initialValue);

    if (process.env.NODE_ENV !== 'production') {
        baseCell.debugPrivate = true;
    }

    baseCell.onMount = (setCell) => {
        const value = storage.getItem(key, initialValue);
        if (isPromiseLike(value)) {
            value.then((v) => setCell(v));
        } else {
            setCell(value);
        }
        let unsub: Unsubscribe | undefined;
        if (storage.subscribe) {
            unsub = storage.subscribe(key, setCell, initialValue);
        }
        return unsub;
    };

    const cellInstance = cell(
        (get) => get(baseCell),
        (get, set, update: SetStateActionWithReset<Value>) => {
            const nextValue =
                typeof update === 'function'
                    ? (update as (prev: Value) => Value | typeof RESET)(get(baseCell))
                    : update;
            if (nextValue === RESET) {
                set(baseCell, initialValue);
                return storage.removeItem(key);
            }
            set(baseCell, nextValue);
            return storage.setItem(key, nextValue);
        }
    );

    return cellInstance;
};

/**
 * @module utils/cell
 * 
 * @file
 * This file provides the implementation of a state manager, and defines the core concepts and types used 
 * in the state manager. The state manager allows you to create and manage cells, which are units of state 
 * that can be read and written to.
 * 
 * This file contains the definitions of various types, interfaces, and the `cell` function for creating cells.
 * Cells can be read-only, writable, or derived, and they provide an abstraction for managing application state.
 * 
 * The `cell` function is the main entry point for creating cells, and it supports different configurations and 
 * variations based on the provided parameters. Use the `cell` function to create cells with the desired behavior 
 * and access their values through the read and write functions.
 */

// Getter function type for retrieving the value of a cell
type Getter = <Value>(cell: Cell<Value>) => Value;

// Setter function type for updating the value of a writable cell
type Setter = <Value, Args extends unknown[], Result>(
    cell: WritableCell<Value, Args, Result>,
    ...args: Args
) => Result;

// Function type representing the set cell function used to update a writable cell with arguments
type SetCell<Args extends unknown[], Result> = <A extends Args>(
    ...args: A
) => Result;

type Read<Value, SetSelf = never> = (
    get: Getter,
    options: { readonly signal: AbortSignal; readonly setSelf: SetSelf }
) => Value;

type Write<Args extends unknown[], Result> = (
    get: Getter,
    set: Setter,
    ...args: Args
) => Result;

type WithInitialValue<Value> = {
    init: Value
}

type OnUnmount = () => void;

type OnMount<Args extends unknown[], Result> = <
    S extends SetCell<Args, Result>
>(
    setCell: S
) => OnUnmount | void;

export interface Cell<Value> {
    toString: () => string;
    read: Read<Value>;
    debugLabel?: string;
    debugPrivate?: boolean;
}

export interface WritableCell<Value, Args extends unknown[], Result>
    extends Cell<Value> {
    read: Read<Value, SetCell<Args, Result>>
    write: Write<Args, Result>
    onMount?: OnMount<Args, Result> // Optional callback function when the cell is mounted
}

type SetStateAction<Value> = Value | ((prev: Value) => Value)

export type PrimitiveCell<Value> = WritableCell<
    Value,
    [SetStateAction<Value>],
    void
>

let keyCount = 0; // global key count for all cells

// writable derived cell
export function cell<Value, Args extends unknown[], Result>(
    read: Read<Value, SetCell<Args, Result>>,
    write: Write<Args, Result>
): WritableCell<Value, Args, Result>

// read-only derived cell
export function cell<Value>(read: Read<Value>): Cell<Value>

// write-only derived cell
export function cell<Value, Args extends unknown[], Result>(
    initialValue: Value,
    write: Write<Args, Result>
): WritableCell<Value, Args, Result> & WithInitialValue<Value>

// primitive cell
export function cell<Value>(
    initialValue: Value
): PrimitiveCell<Value> & WithInitialValue<Value>

export function cell<Value, Args extends unknown[], Result>(
    read: Value | Read<Value, SetCell<Args, Result>>,
    write?: Write<Args, Result>
) {
    const key = `cell${++keyCount}`;
    const config = {
        toString: () => key,
    } as WritableCell<Value, Args, Result> & { init?: Value };

    if (typeof read === 'function') {
        config.read = read as Read<Value, SetCell<Args, Result>>; // assign as read function of the cell
    } else {
        config.init = read;
        config.read = (get) => get(config); // using the getter to retrieve the value of the cell
        config.write = ((get: Getter, set: Setter, arg: SetStateAction<Value>) =>
            set(
                config as unknown as PrimitiveCell<Value>,
                typeof arg === 'function'
                    ? (arg as (prev: Value) => Value)(get(config))
                    : arg
            )) as unknown as Write<Args, Result>;
    }
    if (write) config.write = write;
    return config;
}



/**
 * @module utils/selectCell
 * @file This file contains the logic to slice data from a cell
 * 
 * 
 * @function selectCell
 * @description
 * The `selectCell` function creates a derived cell that selects a slice of data from the value of the source cell.
 * It allows you to extract a specific subset of data from a larger data structure and use it.
 * 
 * @template {Value} Value - The type of the source cell's value.
 * @template {Slice} Slice - The type of the selected slice.
 * @param {Cell<Promise<Value>> | Cell<Value>} cellInstance - The source cell from which to select the slice.
 * @param {(v: Awaited<Value>, prevSlice?: Slice) => Slice} selector - Selector function that extracts desired slice.
 * @param {(a: StaticLifecycle, b: Slice) => boolean} [equalityFn] - Optional equality function to compare prev and current slice.
 * @return {Cell<Promise<Slice>> | Cell<Slice>} - The derived cell representing the selected slice.
 * 
 * @example
 * ```typescript
 * const dataCell = cell(fetchData());
 * 
 * const selectedCell = selectCell(dataCell, (value) => value.name);
 * 
 * const name = useCell(selectedCell);
 * console.log(name);
 * ```
 * 
 * In the above example, the `selectCell` function is used to create a derived cell `selectedCell` that 
 * selects the `name` property from the `dataCell`'s value. The `selectedCell` can be used to access and 
 * track changes to the selected name in the application.
 */

import { cell } from './cell';
import type { Cell } from './cell';

const getCached = <T>(c: () => T, m: WeakMap<object, T>, k: object): T =>
    (m.has(k) ? m : m.set(k, c())).get(k) as T;
const cache1 = new WeakMap();
const memo3 = <T>(
    create: () => T,
    dep1: object,
    dep2: object,
    dep3: object
): T => {
    const cache2 = getCached(() => new WeakMap(), cache1, dep1);
    const cache3 = getCached(() => new WeakMap(), cache2, dep2);
    return getCached(create, cache3, dep3);
};

export function selectCell<Value, Slice>(
    cellInstance: Cell<Promise<Value>>,
    selector: (v: Awaited<Value>, prevSlice?: Slice) => Slice,
    equalityFn?: (a: Slice, b: Slice) => boolean
): Cell<Promise<Slice>>

export function selectCell<Value, Slice>(
    cellInstance: Cell<Value>,
    selector: (v: Awaited<Value>, prevSlice?: Slice) => Slice,
    equalityFn?: (a: Slice, b: Slice) => boolean
): Cell<Slice>

export function selectCell<Value, Slice>(
    cellInstance: Cell<Value>,
    selector: (v: Awaited<Value>, prevSlice?: Slice) => Slice,
    equalityFn: (a: Slice, b: Slice) => boolean = Object.is
) {
    return memo3(
        () => {
            const EMPTY = Symbol();
            const selectValue = ([value, prevSlice]: readonly [
                Awaited<Value>,
                Slice | typeof EMPTY
            ]) => {
                if (prevSlice === EMPTY) {
                    return selector(value);
                }
                const slice = selector(value, prevSlice);
                return equalityFn(prevSlice, slice) ? prevSlice : slice;
            };
            const derivedCell: Cell<Slice | Promise<Slice> | typeof EMPTY> & {
                init?: typeof EMPTY
            } = cell((get) => {
                const prev = get(derivedCell);
                const value = get(cellInstance);
                if (value instanceof Promise || prev instanceof Promise) {
                    return Promise.all([value, prev] as const).then(selectValue);
                }
                return selectValue([value as Awaited<Value>, prev] as const);
            })
            // HACK to read derived cell before initialization
            derivedCell.init = EMPTY;
            return derivedCell;
        },
        cellInstance,
        selector,
        equalityFn
    );
};

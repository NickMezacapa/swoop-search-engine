/**
 * @module arrangements/cellFamily 
 * @file This file contains the logic to create and manage a family of cells based on a parameter
 * 
 * 
 * @function cellFamily
 * @description
 * This function creates and manages a family of cells based on a parameter. 
 * It provides a mechanism to dynamically create and remove cells based on the parameter value. 
 * This function enables the creation of cells with varying parameters and facilitates efficient 
 * management of those cells.
 * 
 * The `cellFamily` function takes in an initializeCell function, which is responsible for creating a 
 * cell based on the provided parameter. It also accepts an optional `areEqual` function that determines 
 * if two parameters are equal. The function returns a `CellFamily` object that encapsulates the cell family 
 * and provides methods for creating, removing, and managing cells.
 * 
 * @template {Param} Param - The type of the parameter used to create and identify cells.
 * @template {CellType} CellType - The type of the cell in the family.
 * @param {function(Param): CellType} initializeCell A function that initializes a cell based on the parameter.
 * @param {function(Param, Param): boolean} [areEqual] An optional function that determines if two parameters are equal.
 * @return {CellFamily<Param, CellType>} A cell family object with methods for creating, removing, and managing cells.
 * 
 * @example
 * ```tsx
 * // Create a cell family for managing counters
 * const counterCellFamily = cellFamily((initialValue) => {
 *   const [value, setValue] = useState(initialValue);
 *   return { value, setValue };
 * });
 * 
 * // Create cells for different counters
 * const counterCell1 = counterCellFamily(0);
 * const counterCell2 = counterCellFamily(10);
 *
 * // Update counterCell1
 * counterCell1.setValue(5);
 *
 * // Remove counterCell2
 * counterCellFamily.remove(10);
 * ```
 */

import type { Cell } from '../utils/cell'

type ShouldRemove<Param> = (createdAt: number, param: Param) => boolean

export interface CellFamily<Param, CellType> {
    (param: Param): CellType
    remove(param: Param): void
    setShouldRemove(shouldRemove: ShouldRemove<Param> | null): void
}

export function cellFamily<Param, CellType extends Cell<unknown>>(
    initializeCell: (param: Param) => CellType,
    areEqual?: (a: Param, b: Param) => boolean
): CellFamily<Param, CellType>

export function cellFamily<Param, CellType extends Cell<unknown>>(
    initializeCell: (param: Param) => CellType,
    areEqual?: (a: Param, b: Param) => boolean
) {
    type CreatedAt = number; // in milliseconds
    let shouldRemove: ShouldRemove<Param> | null = null;
    const cells: Map<Param, [CellType, CreatedAt]> = new Map();
    const createCell = (param: Param) => {
        let item: [CellType, CreatedAt] | undefined;
        if (areEqual === undefined) {
            item = cells.get(param);
        } else {
            // Custom comparator, iterate over all elements
            for (const [key, value] of cells) {
                if (areEqual(key, param)) {
                    item = value;
                    break;
                }
            }
        }

        if (item !== undefined) {
            if (shouldRemove?.(item[1], param)) {
                createCell.remove(param);
            } else {
                return item[0];
            }
        }

        const newCell = initializeCell(param);
        cells.set(param, [newCell, Date.now()]);
        return newCell;
    };

    createCell.remove = (param: Param) => {
        if (areEqual === undefined) {
            cells.delete(param);
        } else {
            for (const [key] of cells) {
                if (areEqual(key, param)) {
                    cells.delete(key);
                    break;
                }
            }
        }
    };

    createCell.setShouldRemove = (fn: ShouldRemove<Param> | null) => {
        shouldRemove = fn
        if (!shouldRemove) return;
        for (const [key, value] of cells) {
            if (shouldRemove(value[1], key)) {
                cells.delete(key);
            }
        }
    };
    return createCell;
};

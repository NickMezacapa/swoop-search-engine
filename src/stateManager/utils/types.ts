import type { Cell, PrimitiveCell, WritableCell } from './cell';

export type Getter = Parameters<Cell<unknown>['read']>[0];
export type Setter = Parameters<WritableCell<unknown, unknown[], unknown>['write']>[1];

export type ExtractCellValue<CellType> = CellType extends Cell<infer Value>
    ? Value
    : never;

export type ExtractCellArgs<CellType> = CellType extends WritableCell<
    any,
    infer Args,
    any
>
    ? Args
    : never;

export type ExtractCellResult<CellType> = CellType extends WritableCell<
    any,
    any[],
    infer Result
>
    ? Result
    : never;

export type SetStateAction<Value> = ExtractCellArgs<PrimitiveCell<Value>>[0];

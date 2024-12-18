import React from "react";
import {FIXED_COL_WIDTH, FIXED_COLUMN_ID} from "../index";
import Checkbox from "@/components/atoms/Checkbox";
import {Row, Table} from "@tanstack/react-table";

export const CheckBoxColumn = {
  id: FIXED_COLUMN_ID,
  enableResizing: false,
  size: FIXED_COL_WIDTH,
  minSize: FIXED_COL_WIDTH,
  maxSize: FIXED_COL_WIDTH,
  header: ({table}: { table: Table<number> }) => (
    <DataTableCheckbox
      value={table.getIsAllPageRowsSelected()}
      setValue={table.toggleAllPageRowsSelected}
      indeterminate={table.getIsSomeRowsSelected()}
    />
  ),
  cell: ({row}: { row: Row<number> }) => (
    <DataTableCheckbox
      value={row.getIsSelected()}
      setValue={row.toggleSelected}
    />
  )
};

type DataTableCheckboxProps = {
  value: boolean;
  setValue: (value: boolean) => void;
  indeterminate?: boolean;
}

export function DataTableCheckbox(props: DataTableCheckboxProps) {
  const {value, setValue, indeterminate} = props;

  return (
    <Checkbox
      checked={value}
      setChecked={setValue}
      indeterminate={indeterminate}
    />
  )
}

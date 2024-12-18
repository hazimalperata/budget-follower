import { ColumnDef } from "@tanstack/react-table";
import { OPTIONS_COLUMN_ID } from "../index";


export function OptionsColumn(width: number) {
  return {
    id: OPTIONS_COLUMN_ID,
    enableResizing: false,
    enableSorting: false,
    size: width,
    minSize: width,
    maxSize: width,
  } as ColumnDef<any, any>;
}

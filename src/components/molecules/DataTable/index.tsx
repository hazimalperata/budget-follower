import {
  Column,
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  useReactTable
} from "@tanstack/react-table"
import React, {createContext, CSSProperties, useCallback, useEffect, useMemo, useRef, useState} from "react"
import styles from "./index.module.scss";
import {SortComponent} from "./SortComponent";
import {Pagination} from "./Pagination";
import NavbarNameComponent from "./NavbarNameComponent";
import SearchingComponent from "@/components/atoms/SearchingComponent";
import TableLoading from "@/components/molecules/DataTable/TableLoading";
import TableEmpty from "@/components/molecules/DataTable/TableEmpty";
import {RankingInfo, rankItem} from '@tanstack/match-sorter-utils'
import Button from "@/components/atoms/Button";
import html2pdf from 'html2pdf.js';


declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank,
  })

  return itemRank.passed
}

export const FIXED_COLUMN_ID = "fixed";
export const OPTIONS_COLUMN_ID = "options";

export const FIXED_COL_WIDTH = 36; // PADDING + CHECKBOX WIDTH
const STICKY_WIDTH = 150;
const MIN_COL_WIDTH = 100;

export type DataTableContextType<T> = {
  table: Table<T>,
  selectedRows: Row<T>[];
  sorting: SortingState;
}

export const DataTableContext = createContext<DataTableContextType<any>>({
  table: {} as Table<any>,
  selectedRows: [],
  sorting: [],
});

type DataTableProps<T> = {
  columns: ColumnDef<T, any>[];
  data: T[];
  pageSize?: number;
  mainQueryKey?: string;
  searchPlaceholder?: string;
  hidePagination?: boolean;
  hideHeader?: boolean;
  hideSearch?: boolean;
  isLoading?: boolean;
  customDataName?: string;
  refreshNavbarAlso?: boolean;
  innerNavbarName?: string;
  disableResize?: boolean;
  ExtraTopHeader?: React.JSX.Element;
  ExtraBottomHeader?: React.JSX.Element;
  ExtraHeaderButtonArea?: React.JSX.Element;
  getRowId: (row: T) => string,
  stickyColIndexes?: number[],
  id?: string;
  SortComponent?: (props: { sorting: SortingState, setSorting: React.Dispatch<React.SetStateAction<SortingState>> }) => React.JSX.Element;
  initialRowSelectionState?: RowSelectionState;
  setTable?: (table: Table<T>) => void;
  onRowSelectionChange?: (selectionState: RowSelectionState) => void;
  CheckboxElement?: (props: { selectedRows: Row<T>[], setAllSelection: (value?: boolean) => void }) => (React.JSX.Element | null);
}

export default function DataTable<T>(props: DataTableProps<T>) {

  const {
    id = "data-table",
    columns,
    disableResize,
    innerNavbarName,
    stickyColIndexes,
    getRowId,
    data,
    pageSize,
    searchPlaceholder,
    hideSearch,
    customDataName,
    hidePagination,
    hideHeader,
    initialRowSelectionState,
    setTable,
    isLoading,
    onRowSelectionChange,
  } = props;

  const parentRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(initialRowSelectionState ?? {});
  const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: pageSize ?? 30});

  const [tableSearchElement, setTableSearchElement] = useState<React.JSX.Element | undefined>();
  const [globalFilter, setGlobalFilter] = useState('');

  const hasFixedColumn = useMemo(() => columns.find(x => x.id === FIXED_COLUMN_ID) !== undefined, [columns]);
  const hasOptionsColumn = useMemo(() => columns.find(x => x.id === OPTIONS_COLUMN_ID) !== undefined, [columns]);

  const indexes = useMemo(() => stickyColIndexes ? stickyColIndexes : hasFixedColumn ? [0, 1] : [0], [hasFixedColumn, stickyColIndexes]);

  const getHeaderWith = useCallback(() => {
    if (!parentRef.current) return undefined;

    let tableParentWidth = parentRef.current.getBoundingClientRect().width;
    let columnNums = columns.length;

    if (hasFixedColumn) {
      tableParentWidth -= FIXED_COL_WIDTH;
      columnNums -= 1;
    }

    if (hasOptionsColumn) {
      const col = columns.find(x => x.id === OPTIONS_COLUMN_ID);
      if (col) {
        tableParentWidth -= col.size as number;
        columnNums -= 1;
      }
    }

    if (columnNums === 1) {
      return tableParentWidth;
    }

    const tempWidth = tableParentWidth / columnNums;

    if (indexes.length !== 0 && tempWidth <= STICKY_WIDTH) {
      tableParentWidth -= STICKY_WIDTH;
      columnNums -= 1;
    }

    return tableParentWidth / columnNums;
  }, [columns, hasFixedColumn, hasOptionsColumn, indexes.length]);

  const handledColumns = columns.map((column, index) => ({
    ...column,
    size: (column.id && [FIXED_COLUMN_ID, OPTIONS_COLUMN_ID].includes(column.id)) ? column.size : getHeaderWith(),
    minSize: column.minSize ? column.minSize : indexes.includes(index) ? STICKY_WIDTH : MIN_COL_WIDTH,
    maxSize: column.maxSize ? column.maxSize : undefined,
    enableResizing: disableResize ? false : column.enableResizing,
  }));

  const [tableData, setTableData] = useState(data);

  const table = useReactTable({

    data: tableData,
    columns: handledColumns,
    state: {
      pagination,
      sorting,
      rowSelection,
      globalFilter
    },
    getRowId: getRowId,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    columnResizeMode: 'onChange',
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: process.env.NODE_ENV !== 'production',
    enableRowSelection: true,
    enableColumnPinning: true,
    enableGlobalFilter: true,
    globalFilterFn: 'fuzzy',
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });

  useEffect(() => {
    setTable?.(table);
  }, [setTable, table]);

  useEffect(() => {
    onRowSelectionChange?.(rowSelection);
  }, [rowSelection, onRowSelectionChange]);

  const isEmpty = useMemo(() => {
    return table.getRowModel().rows.length === 0;
    //deps array changed for suitable detection change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getRowModel().rows]);

  //deps array changed for suitable detection change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectedRows = useMemo(() => table.getSelectedRowModel().rows, [table.getSelectedRowModel().rows]);

  const getCommonPinningStyles = (column: Column<T>, isHeader?: boolean): CSSProperties => {
    const isPinned = column.getIsPinned();

    return {
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      opacity: (isPinned && isHeader) ? 0.9 : 1,
      position: isPinned ? 'sticky' : 'static',
      zIndex: isPinned ? 2 : 0,
      width: column.getSize(),
      maxWidth: column.getSize(),
      minWidth: column.getSize(),
    }
  }

  const resetAllHeaders = useCallback(() => {
    table.getAllColumns().forEach(x => x.resetSize());
  }, [table]);

  const generatePDF = () => {
    const element = document.getElementById('data-content'); // PDF'ye dönüştürmek istediğiniz öğe
    const options = {
      margin: 0.2,
      filename: 'data-table.pdf',
      image: {type: 'jpeg', quality: 1},
      // html2canvas: {scale: 4},
      jsPDF: {unit: 'cm', orientation: 'l'}
    };
    html2pdf().from(element).set(options).save();
  };

  useEffect(() => {
    const cols = table.getAllColumns();
    if (cols && cols.length > 0) {
      indexes.forEach(x => {
        if (x < cols.length) {
          const col = cols[x];
          col.pin('left');
        }
      });
    }
  }, [indexes, table]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <DataTableContext.Provider value={{table, selectedRows, sorting}}>
      <div id={id} className="flex flex-col w-full gap-2.5 max-w-full">
        {props.ExtraTopHeader}
        {!hideHeader && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5" style={{minHeight: 42}}>
            <div className="flex flex-row items-center gap-2.5">
              {innerNavbarName && (
                <NavbarNameComponent innerNavbarName={innerNavbarName} extraClassName="hidden md:flex"/>
              )}
              {isLoading ? (
                <div className="pulse h-5" style={{width: 150}}/>
              ) : (
                <div className="text-sm">
                  {tableData.length ?? 0} adet {customDataName} gösteriliyor
                </div>
              )}
            </div>
            <div className="flex flex-row items-center justify-end gap-2.5">
              <Button variant="filledBlue" size="medium" label="PDF İndir" onClick={generatePDF}/>
              {!hideSearch && <SearchingComponent placeholder={searchPlaceholder} delayedSearchText={globalFilter} setDelayedSearchText={setGlobalFilter} setTableSearchElement={setTableSearchElement}/>}
              {props.SortComponent?.({setSorting, sorting})}
            </div>
          </div>
        )}
        <div className="flex flex-row items-center gap-2.5">
          {tableSearchElement}
        </div>
        {props.ExtraBottomHeader}
        <div ref={parentRef} className="w-full overflow-x-auto horizontal-scroll-bar" style={{marginBottom: 30}}>
          <table id='data-content' ref={tableRef} className={styles.dataTable}
                 style={{width: table.getTotalSize(), minWidth: parentRef.current ? table.getTotalSize() <= parentRef.current.getBoundingClientRect().width ? "unset" : "100%" : "100%"}}>
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) =>
                  <th key={header.id} colSpan={header.colSpan} style={{...getCommonPinningStyles(header.column, true)}} className="dataTableHeader">
                    {header.isPlaceholder ? null : <div {...{
                      className: `${header.column.getIsResizing() ? 'bg-gray-50' : 'bg-background'} overflow-hidden relative flex flex-row items-center h-[45px] ${header.column.id === FIXED_COLUMN_ID ? "pr-2.5" : "pr-5"} py-[15px] pl-2.5`,
                    }}>
                      <div {...{
                        className: `${header.column.getCanSort() ? 'cursor-pointer' : ''} flex flex-row items-center gap-x-[5px] overflow-hidden select-none`,
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                        {header.column.id === FIXED_COLUMN_ID ? (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        ) : (
                          <div className="three-dot">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                        {header.column.getCanSort() && (
                          <SortComponent state={header.column.getIsSorted()}/>
                        )}
                      </div>
                      <div
                        {...{
                          onDoubleClick: resetAllHeaders,
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `${header.column.getCanResize() && styles.resizer} ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                        }}
                      />
                    </div>
                    }
                  </th>
                )}
              </tr>
            ))}
            </thead>
            <tbody>
            {isLoading ? (
              <TableLoading colNum={columns.length}/>
            ) : isEmpty ? (
              <TableEmpty colNum={columns.length}/>
            ) : table.getRowModel().rows.map(row => (
              <React.Fragment key={row.id}>
                <tr>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} style={{...getCommonPinningStyles(cell.column)}} className="bg-background py-2.5 pr-5 pl-2.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
            </tbody>
          </table>
        </div>
        {(!isEmpty && !hidePagination && !isLoading) && (
          <Pagination key={pagination.pageIndex} page={pagination.pageIndex + 1} setPage={(num) => setPagination(item => ({...item, pageIndex: num - 1}))} pageSize={pagination.pageSize} totalCount={tableData.length ?? 0}/>
        )}
      </div>
      {props.CheckboxElement?.({selectedRows, setAllSelection: table.toggleAllPageRowsSelected})}
    </DataTableContext.Provider>
  )
}

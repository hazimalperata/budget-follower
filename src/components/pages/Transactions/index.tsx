'use client'

import {useAppSelector} from "@/lib/hooks";
import {createColumnHelper} from "@tanstack/table-core";
import {OptionsColumn} from "@/components/molecules/DataTable/OptionsColumn";
import DataTable from "@/components/molecules/DataTable";
import {Transaction} from "@/types/transaction";
import {getDateString} from "@/utils/date";
import AddTransactionButton from "@/components/atoms/AddTransactionButton";
import {useCallback} from "react";
import TransactionTypeCell from "@/components/pages/Transactions/TransactionTypeCell";
import TransactionOptionsCell from "@/components/pages/Transactions/TransactionOptionsCell";

export default function TransactionsPage() {
  const transactions = useAppSelector((state) => state.transactionReducer.transactions);
  const categories = useAppSelector((state) => state.categoryReducer.categories);

  const getCategoryName = useCallback((categoryId?: string) => {
    return categories.find((c) => c.id === categoryId)?.name;
  }, [categories]);

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor('categoryId', {
      cell: info => getCategoryName(info.getValue()),
      header: 'KATEGORİ',
    }),
    columnHelper.accessor('date', {
      cell: info => getDateString(new Date(info.getValue())),
      header: 'TARİH',
    }),
    columnHelper.accessor('type', {
      cell: info => <TransactionTypeCell type={info.getValue()}/>,
      header: 'TİP',
    }),
    columnHelper.accessor('amount', {
      cell: info => info.getValue(),
      header: 'MİKTAR',
    }),
    columnHelper.accessor('description', {
      cell: info => info.getValue(),
      header: 'AÇIKLAMA',
    }),
    columnHelper.accessor(row => row, {
      ...OptionsColumn(100),
      cell: info => <TransactionOptionsCell transaction={info.getValue()}/>,
      header: "İŞLEMLER",
    }),
  ]

  return (
    <div className="flex flex-col gap-y-[15px] p-6">
      <DataTable
        innerNavbarName="Kayıtlar"
        customDataName="kayıt"
        columns={columns}
        data={Object.values(transactions)}
        getRowId={x => x.id}
      />
      <AddTransactionButton/>
    </div>
  )
}

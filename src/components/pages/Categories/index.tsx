'use client'

import {useAppSelector} from "@/lib/hooks";
import DataTable from "@/components/molecules/DataTable";
import {createColumnHelper} from "@tanstack/table-core";
import {Category} from "@/types/category";
import Button from "@/components/atoms/Button";
import ModalAnimator from "@/components/molecules/ModalAnimator";
import AddCategoryModal from "@/components/modals/AddCategoryModal";
import {useState} from "react";
import {OptionsColumn} from "@/components/molecules/DataTable/OptionsColumn";
import CategoryOptionsCell from "@/components/pages/Categories/CategoryOptionsCell";
import CategoryTypeCell from "@/components/pages/Categories/CategoryTypeCell";
import CategoryAlertsCell from "@/components/pages/Categories/CategoryAlertsCell";

export default function CategoriesPage() {
  const categories = useAppSelector((state) => state.categoryReducer.categories);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const columnHelper = createColumnHelper<Category>();

  const columns = [
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
      header: 'KATEGORİ ADI',
    }),
    columnHelper.accessor('description', {
      cell: info => info.getValue(),
      header: 'KATEGORİ AÇIKLAMASI',
    }),
    columnHelper.accessor('type', {
      cell: info => <CategoryTypeCell type={info.getValue()}/>,
      header: 'KATEGORİ TİPİ',
    }),
    columnHelper.accessor('limitAmount', {
      cell: info => info.getValue(),
      header: 'KATEGORİ LİMİTİ',
    }),
    columnHelper.accessor('alerts', {
      cell: info => <CategoryAlertsCell categoryId={info.row.original.id} alerts={info.getValue()}/>,
      header: 'KATEGORİ ALARMLARI',
    }),
    columnHelper.accessor('transactionIds', {
      cell: info => info.getValue().length,
      header: 'KAYIT SAYISI',
    }),
    columnHelper.accessor(row => row, {
      ...OptionsColumn(100),
      cell: info => <CategoryOptionsCell category={info.getValue()}/>,
      header: "İŞLEMLER",
    }),
  ]

  return (
    <div className="flex flex-col gap-y-[15px] p-6">
      <Button
        className="self-end"
        label="Kategori Ekle"
        variant="filledBlue"
        size="medium"
        onClick={() => setShowAddCategoryModal(true)}
      />
      <DataTable
        innerNavbarName="Kategoriler"
        customDataName="kategori"
        columns={columns}
        data={categories}
        getRowId={x => x.id}
      />
      <ModalAnimator showModal={showAddCategoryModal} onClose={() => setShowAddCategoryModal(false)}>
        <AddCategoryModal/>
      </ModalAnimator>
    </div>
  )
}

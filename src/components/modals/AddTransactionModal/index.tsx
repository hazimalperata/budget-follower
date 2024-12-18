'use client'

import BasicModalPreset from "@/components/atoms/BasicModalPreset";
import Dropdown, {DropdownPreset} from "@/components/atoms/Dropdown";
import {DropdownOption} from "@/components/atoms/Dropdown/DropdownOptionElement/types";
import React, {useCallback, useContext, useMemo, useState} from "react";
import {Transaction, TransactionType} from "@/types/transaction";
import MaskInput from "@/components/atoms/Input/MaskInput";
import Input, {getCurrencyIMaskOptions} from "@/components/atoms/Input";
import CustomDatePicker from "@/components/atoms/CustomDatePicker";
import Button from "@/components/atoms/Button";
import {Category, CategoryTypeDict} from "@/types/category";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {ModalAnimatorContext} from "@/components/molecules/ModalAnimator";
import {addTransaction} from "@/lib/features/transactions/transactionSlice";
import {addTransactionIdToCategory} from "@/lib/features/categories/categorySlice";

export default function AddTransactionModal() {
  const dispatch = useAppDispatch();
  const {onClose} = useContext(ModalAnimatorContext);

  const categories = useAppSelector((state) => state.categoryReducer.categories);

  const transactionOptions: DropdownOption<TransactionType>[] = [
    {key: "income", value: "Gelir", item: 'income'},
    {key: "outcome", value: "Gider", item: 'outcome'}
  ];

  const [selectedTransactionType, setSelectedTransactionType] = useState<DropdownOption<TransactionType>>();
  const [transactionValue, setTransactionValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DropdownOption<Category>>();

  const categoryOptions: DropdownOption<Category>[] = useMemo(() => {
    return categories.map(x => ({key: x.id, value: `${x.name} - ${CategoryTypeDict[x.type]}`, item: x}));
  }, [categories]);

  const isValidAdd = useMemo(() => {
    if (selectedCategory?.item?.type === 'mixed' && !selectedTransactionType) return false;
    if (!transactionValue.trim() || Number(transactionValue) === 0) return false;
    if (!selectedDate) return false;
    return true;
  }, [selectedCategory?.item?.type, selectedDate, selectedTransactionType, transactionValue]);

  const onAddTransaction = useCallback(() => {
    const transactionId = crypto.randomUUID();

    const transaction: Transaction = {
      id: transactionId,
      amount: Number(transactionValue),
      date: selectedDate!.toISOString(),
      description: description,
      type: selectedCategory?.item?.type === 'mixed'
        ? (selectedTransactionType!.item as TransactionType)
        : (selectedCategory!.item!.type as TransactionType),
      categoryId: selectedCategory?.key,
    };

    if (selectedCategory) {
      dispatch(
        addTransactionIdToCategory({
          categoryId: selectedCategory.key,
          transactionId,
        })
      );

    }

    dispatch(addTransaction(transaction));

    onClose();
  }, [description, dispatch, onClose, selectedCategory, selectedDate, selectedTransactionType, transactionValue]);

  return (
    <BasicModalPreset
      title="Kayıt ekleme"
      description="Kayıt tipini, miktarını ve tarihini girip kaydedebilirsiniz. Dilerseniz kategori seçerek özelleştirebilirsiniz."
    >
      <div className="flex flex-col gap-y-2.5 mx-5 mb-5">
        <Dropdown
          label="Kategori"
          dropdownPreset={DropdownPreset.Outline}
          options={categoryOptions}
          selectedOption={selectedCategory}
          setSelectedOption={setSelectedCategory}
          multiple={false}
        />
        {(selectedCategory && selectedCategory.item?.type === 'mixed') && (
          <Dropdown
            hideSearch
            disableSort
            label="Kayıt tipi"
            dropdownPreset={DropdownPreset.Outline}
            options={transactionOptions}
            selectedOption={selectedTransactionType}
            setSelectedOption={setSelectedTransactionType}
            multiple={false}
          />
        )}
        <MaskInput
          label="Miktar"
          value={transactionValue}
          onValueChange={setTransactionValue}
          iMaskOptions={getCurrencyIMaskOptions({allowFloat: true})}
        />
        <Input
          label="Açıklama"
          value={description}
          onValueChange={setDescription}
        />
        <div className="flex flex-col gap-y-[5px]">
          <label className="text-sm">Tarih</label>
          <CustomDatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <Button
          label="Ekle"
          size="small"
          disabled={!isValidAdd}
          variant="filledBlue"
          className="self-end"
          onClick={onAddTransaction}
        />
      </div>
    </BasicModalPreset>
  )
}

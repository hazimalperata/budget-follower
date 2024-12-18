import React, {useCallback, useContext, useMemo, useState} from "react";
import {Category, CategoryType} from "@/types/category";
import BasicModalPreset from "@/components/atoms/BasicModalPreset";
import MaskInput from "@/components/atoms/Input/MaskInput";
import Input, {getCurrencyIMaskOptions, PercentageIMaskOptions} from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import {useAppDispatch} from "@/lib/hooks";
import {addCategory} from "@/lib/features/categories/categorySlice";
import {ModalAnimatorContext} from "@/components/molecules/ModalAnimator";
import {DropdownOption} from "@/components/atoms/Dropdown/DropdownOptionElement/types";
import Dropdown, {DropdownPreset} from "@/components/atoms/Dropdown";
import {CategoryAlert} from "@/types/categoryAlert";
import Label from "@/components/atoms/Label";
import {MdClose} from "react-icons/md";


export default function AddCategoryModal() {
  const dispatch = useAppDispatch();
  const {onClose} = useContext(ModalAnimatorContext);

  const categoryTypeOptions: DropdownOption<CategoryType>[] = [
    {key: "income", value: "Gelir", item: 'income'},
    {key: "outcome", value: "Gider", item: 'outcome'},
    {key: "mixed", value: "Karışık", item: 'mixed'}
  ];

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryLimit, setCategoryLimit] = useState("");
  const [selectedCategoryType, setSelectedCategoryType] = useState<DropdownOption<CategoryType>>();
  const [alertPercentage, setAlertPercentage] = useState("");
  const [categoryAlerts, setCategoryAlerts] = useState<CategoryAlert[]>([]);

  const isValidAdd = useMemo(() => {
    if (!categoryName.trim()) return false;
    if (!selectedCategoryType) return false;
    if (!categoryLimit.trim() || Number(categoryLimit) === 0) return false;
    return true;
  }, [categoryLimit, categoryName, selectedCategoryType]);

  const isValidAddAlert = useMemo(() => {
    if (!alertPercentage.trim() || Number(alertPercentage) === 0) return false;
    if (categoryAlerts.find(x => x.percentage === Number(alertPercentage))) return false;
    return true;
  }, [alertPercentage, categoryAlerts]);

  const onAddAlert = useCallback(() => {
    const alert: CategoryAlert = {
      id: crypto.randomUUID(),
      percentage: Number(alertPercentage),
      isActive: false,
    }
    setCategoryAlerts(x => [...x, alert]);
    setAlertPercentage("");
  }, [alertPercentage]);

  const onDeleteAlert = (alertId: string) => {
    setCategoryAlerts(x => [...x.filter(alert => alert.id !== alertId)])
  }

  const onCreateCategory = useCallback(() => {
    const category: Category = {
      id: crypto.randomUUID(),
      name: categoryName,
      description: description,
      type: selectedCategoryType!.item!,
      limitAmount: Number(categoryLimit),
      transactionIds: [],
      alerts: categoryAlerts,
    }
    dispatch(addCategory(category));
    onClose();
  }, [categoryAlerts, categoryLimit, categoryName, description, dispatch, onClose, selectedCategoryType]);

  return (
    <BasicModalPreset
      title="Kategori Oluşturma"
      description="Kategori için bir isim ve dilerseniz bir limit ekleyebilirsiniz."
      style={{width: 650}}
    >
      <div className="flex flex-col gap-y-2.5 mx-5 mb-5">
        <Input
          label="Kategori İsmi"
          value={categoryName}
          onValueChange={setCategoryName}
        />
        <Dropdown
          hideSearch
          disableSort
          label="Kategori Tipi"
          dropdownPreset={DropdownPreset.Outline}
          options={categoryTypeOptions}
          selectedOption={selectedCategoryType}
          setSelectedOption={setSelectedCategoryType}
          multiple={false}
        />
        <Input
          label="Kategori Açıklaması"
          value={description}
          onValueChange={setDescription}
        />
        <MaskInput
          label="Kategori Limiti"
          value={categoryLimit}
          onValueChange={setCategoryLimit}
          iMaskOptions={getCurrencyIMaskOptions({allowFloat: true})}
        />
        <MaskInput
          label="Kategori Uyarı Yüzdesi"
          value={alertPercentage}
          onValueChange={setAlertPercentage}
          iMaskOptions={PercentageIMaskOptions}
          childrenWidth={60}
        >
          <Button
            disabled={!isValidAddAlert}
            label="Ekle"
            variant="filledBlue"
            size="small"
            onClick={onAddAlert}
          />
        </MaskInput>
        <div className="flex flex-row flex-wrap gap-x-[5px]">
          {categoryAlerts.map(alert => (
            <Label key={alert.id} rightIcon={<MdClose className="cursor-pointer" onClick={() => onDeleteAlert(alert.id)}/>} preset="filled" color="grey">
              % {alert.percentage}
            </Label>
          ))}
        </div>
        <Button
          label="Ekle"
          size="small"
          disabled={!isValidAdd}
          variant="filledBlue"
          className="self-end"
          onClick={onCreateCategory}
        />
      </div>
    </BasicModalPreset>
  )
}

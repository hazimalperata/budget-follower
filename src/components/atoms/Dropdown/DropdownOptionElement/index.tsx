import React from "react";
import {MdCheck} from "react-icons/md";
import {DropdownOptionElementProps} from "@/components/atoms/Dropdown/DropdownOptionElement/types";
import Checkbox from "@/components/atoms/Checkbox";

export const DROPDOWN_OPTION_HEIGHT = 38;

export default function DropdownOptionElement<T>(props: DropdownOptionElementProps<T>) {
  const {option, isSelected, onSelect, style, multiple} = props;

  return (
    <button
      className={`${isSelected ? "text-blue" : "text-foreground"} relative text-tiny leading-6 flex flex-row items-center gap-2.5 text-start py-[7px] pr-2.5 ${multiple ? "pl-2.5" : "pl-10"} bg-background hover:bg-gray-50 hover:text-gray-700`}
      style={style}
      title={option.value}
      onClick={() => onSelect(option)}
    >
      {multiple ? (
        <Checkbox checked={!!isSelected} setChecked={() => undefined}/>
      ) : (
        isSelected && <MdCheck className="absolute left-2.5" width={20} height={20}/>
      )}
      <div className="three-dot">{option.value}</div>
    </button>
  )
}

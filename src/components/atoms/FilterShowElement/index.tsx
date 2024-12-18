import React from "react";
import Label from "../Label";
import {MdClose} from "react-icons/md";

type FilterShowElementProps = {
  onRemove: () => void;
  value: string;
  isSearch?: boolean;
}


export default function FilterShowElement(props: FilterShowElementProps) {
  const {onRemove, value, isSearch} = props;
  return (
    <Label
      key={value}
      preset="outline"
      color="black"
      rightIcon={
        <button onClick={onRemove}>
          <MdClose width={16} height={16}/>
        </button>
      }
    >
      {isSearch ? `Arama: ${value}` : value}
    </Label>
  )
}

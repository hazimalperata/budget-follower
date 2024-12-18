import React from "react";
import {DropdownOption} from "@/components/atoms/Dropdown/DropdownOptionElement/types";

type ConditionalProps<T> = | {
  selected: DropdownOption<T>[];
  setSelected: (options: DropdownOption<T>[]) => void;
  multiple: true;
} | {
  selected: DropdownOption<T> | undefined;
  setSelected: (options: DropdownOption<T> | undefined) => void;
  multiple: false;
}

type DropdownMenuDefaultProps<T> = {
  shownOptionCount?: number;
  hideSearch?: boolean;
  options?: DropdownOption<T>[];
  stayOpenOnSelect?: boolean;
  blockReselect?: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialOptions?: DropdownOption<T>[];
  allOption?: boolean;
  disableSort?: boolean;
}

export type DropdownMenuProps<T> = DropdownMenuDefaultProps<T> & ConditionalProps<T>;

import React, {CSSProperties} from "react";
import {DropdownPreset} from "@/components/atoms/Dropdown/index";
import {DropdownOption} from "@/components/atoms/Dropdown/DropdownOptionElement/types";

type MultipleConditionalProps<T> = | {
  selectedOption: DropdownOption<T>[];
  setSelectedOption: (options: DropdownOption<T>[]) => void;
  multiple: true;
} | {
  selectedOption: DropdownOption<T> | undefined;
  setSelectedOption: (options: DropdownOption<T> | undefined) => void;
  multiple: false;
}

export type DropdownSizes = 'large' | 'medium' | 'small';

type DropdownDefaultProps<T> = {
  dropdownPreset: DropdownPreset;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  leftIcon?: React.ReactNode;
  hideSearch?: boolean;
  isDisabled?: boolean;
  style?: CSSProperties;
  className?: string;
  shownOptionCount?: number;
  stayOpenOnSelect?: boolean;
  blockReselect?: boolean;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  forceShowError?: boolean;
  initialOptions?: DropdownOption<T>[];
  allOption?: boolean;
  disableSort?: boolean;
  isLoading?: boolean;
  dropdownSize?: DropdownSizes;
  options: DropdownOption<T>[];
  pageSize?: never;
}

export type DropdownProps<T> = DropdownDefaultProps<T> & MultipleConditionalProps<T>;

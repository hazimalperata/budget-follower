import React, {ReactNode} from "react";

export type DropdownOption<T = unknown> = {
  key: string;
  value: string;
  element?: ReactNode | string;
  item?: T;
};

export type DropdownOptionElementProps<T> = {
  option: DropdownOption<T>;
  isSelected?: boolean;
  onSelect: (option: DropdownOption<T>) => void;
  style?: React.CSSProperties;
  multiple: boolean;
}

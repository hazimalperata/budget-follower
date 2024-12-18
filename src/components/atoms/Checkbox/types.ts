import {CSSProperties} from "react";

export enum CheckboxPreset {
  Blue,
  Red,
}

export type CheckboxProps = {
  checked: boolean;
  setChecked: (value: boolean) => void;
  label?: string;
  isDisabled?: boolean;
  indeterminate?: boolean;
  checkboxPreset?: CheckboxPreset;
  labelClassName?: string;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  tabIndex?: number;
}

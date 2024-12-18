import React, {CSSProperties} from "react";
import {IconType} from "react-icons";

export enum InputSize {
  Small,
  Medium,
  Large
}

type InputConditionalProps = | {
  children: React.ReactNode;
  childrenWidth: number;
} | {
  children?: never;
  childrenWidth?: never;
}

type InputNormalProps = {
  value: string;
  onValueChange?: (value: string) => void;
  label?: string | React.ReactNode;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  isRequired?: boolean;
  leftIcon?: IconType;
  rightIcon?: (error: string | null | undefined) => React.ReactNode;
  validator?: (str: string) => string | null | undefined;
  defaultMessage?: string | undefined;
  validMessage?: string | undefined;
  limit?: number;
  inputRef?: (node: HTMLInputElement | null) => void;
  passErrorToRightIcon?: boolean;
  validatorValue?: string;
  forceShowError?: boolean;
  borderClassName?: string;
  customInputSize?: InputSize;
  isLoading?: boolean;
}

export type InputProps = InputNormalProps & InputConditionalProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

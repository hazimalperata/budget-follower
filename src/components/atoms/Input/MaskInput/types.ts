import {InputProps} from "@/components/atoms/Input/types";
import type {FactoryOpts} from "imask";

export type MaskInputProps = InputProps & {
  iMaskOptions: FactoryOpts;
  outerData?: string | undefined;
}

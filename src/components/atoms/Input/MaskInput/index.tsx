import React, {forwardRef, RefObject, useEffect, useRef} from "react";
import {useIMask} from "react-imask";
import Input from "@/components/atoms/Input";
import {MaskInputProps} from "@/components/atoms/Input/MaskInput/types";

const MaskInput = forwardRef<HTMLInputElement | null, MaskInputProps>(function IMaskCustomInput(props, outerRef) {
  const {iMaskOptions, onValueChange, disabled, outerData, ...rest} = props;

  const {
    ref,
    value: maskValue,
    unmaskedValue,
    setUnmaskedValue,
  } = useIMask(iMaskOptions);

  const outerValueIsSet = useRef(false);

  useEffect(() => {
    if (outerData) {
      outerValueIsSet.current = true;
      setUnmaskedValue(outerData);
    }
  }, [outerData, setUnmaskedValue]);

  useEffect(() => {
    if (!disabled) {
      onValueChange?.(unmaskedValue);
    }
  }, [disabled, onValueChange, unmaskedValue]);

  return (
    <Input
      {...rest}
      inputRef={node => {
        ref.current = node;
        if (outerRef) {
          (outerRef as RefObject<HTMLInputElement | null>).current = node;
        }
      }}
      disabled={disabled}
      value={maskValue}
      validatorValue={unmaskedValue}
    />
  )
});

export default MaskInput;

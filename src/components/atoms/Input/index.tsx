import clsx from "clsx";
import React, {ChangeEvent, CSSProperties, useCallback, useMemo, useState} from "react";
import styles from "./index.module.scss";
import type {FactoryOpts} from "imask";
import {InputProps, InputSize} from "@/components/atoms/Input/types";


export default function Input(props: InputProps) {
  const {
    children,
    value,
    disabled,
    leftIcon,
    rightIcon,
    childrenWidth,
    validator,
    onBlur,
    onFocus,
    label,
    isRequired,
    containerStyle,
    containerClassName,
    onValueChange,
    placeholder,
    type,
    limit,
    passErrorToRightIcon,
    validMessage,
    defaultMessage,
    inputRef,
    validatorValue,
    forceShowError,
    maxLength,
    borderClassName,
    isLoading,
    customInputSize = InputSize.Large,
    ...rest
  } = props;

  const [blurred, setBlurred] = useState(false);

  const errorMessage = useMemo(() => {
      const checkValue = validatorValue ? validatorValue : value;
      if (validator) {
        return validator(checkValue)
      }
    }, [validator, validatorValue, value]
  );

  const onBlurNew = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setBlurred(true);
    onBlur?.(event);
  }, [onBlur]);

  const onFocusNew = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);
  }, [onFocus]);

  const showError = useMemo(() => (forceShowError ? true : blurred) && errorMessage !== undefined && !disabled, [forceShowError, blurred, errorMessage, disabled]);

  const showErrorMessage = useMemo(() => (blurred && typeof errorMessage === "string" && !disabled), [errorMessage, disabled, blurred]);

  const showValidMessage = useMemo(() => {
    return errorMessage === undefined && !!value && validMessage !== undefined
  }, [errorMessage, validMessage, value]);

  const showDefaultMessage = useMemo(() => {
    return errorMessage === undefined && !value && defaultMessage !== undefined;
  }, [defaultMessage, errorMessage, value]);

  const showBottomLabel = useMemo(() => {
    if (limit !== undefined) return true;
    if (!passErrorToRightIcon && showErrorMessage) return true;
    if (!value && defaultMessage !== undefined && errorMessage === undefined) return true;
    if (value && validMessage !== undefined && errorMessage === undefined) return true;
    return false;
  }, [defaultMessage, errorMessage, limit, passErrorToRightIcon, showErrorMessage, validMessage, value]);

  const sizeStyle = useMemo(() => {
    switch (customInputSize) {
      case InputSize.Small:
        return styles.smallInput;
      case InputSize.Medium:
        return styles.mediumInput;
      case InputSize.Large:
        return styles.largeInput;
    }
  }, [customInputSize]);

  const handleInputChange = useCallback(({target: {value: inputValue}}: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onValueChange?.(inputValue);
    }
  }, [disabled, onValueChange]);


  return (
    <div className={clsx("flex flex-col gap-y-[5px]", containerClassName)} style={containerStyle}>
      <label className="flex flex-col gap-y-[5px]">
        {label !== undefined && <div className="text-sm">{label} {isRequired && <span className="text-red-400"> *</span>}</div>}
        {isLoading ? (
          <div className={clsx("pulse", {
            "h-8": customInputSize === InputSize.Small,
            "h-9": customInputSize === InputSize.Medium,
            "h-10": customInputSize === InputSize.Large,
          })}/>
        ) : (
          <div
            className={clsx(
              styles.customInput,
              sizeStyle,
              disabled && styles.isDisabled,
              showValidMessage && styles.isValid,
              showError && styles.hasError,
              borderClassName,
              leftIcon !== undefined && styles.hasLeftIcon,
              !!rightIcon?.(undefined) && styles.hasRightIcon,
              children !== undefined && styles.hasChildren,
            )}
            onBlur={onBlurNew}
            onFocus={onFocusNew}
            style={{
              '--children-width': `${childrenWidth || 0}px`,
            } as CSSProperties}
          >
            {leftIcon !== undefined && (
              <div className="absolute pointer-events-none select-none left-3">
                {leftIcon({width: 20, height: 20})}
              </div>
            )}
            <input
              ref={node => inputRef?.(node)}
              disabled={disabled}
              value={value}
              onChange={handleInputChange}
              placeholder={placeholder ?? "Girin"}
              type={type}
              maxLength={limit ? limit : maxLength}
              {...rest}
            />
            {children !== undefined && (
              <div className="absolute" style={{right: rightIcon === undefined ? 4 : 34}}>
                {children}
              </div>
            )}
            {rightIcon !== undefined && (
              <div className="absolute select-none right-1">
                {rightIcon(errorMessage)}
              </div>
            )}
          </div>
        )}
      </label>
      {showBottomLabel && (
        <div className="flex flex-row items-center">
          {showErrorMessage ? (
            <div className="text-sm text-red">
              {errorMessage as string}
            </div>
          ) : showValidMessage ? (
            <div className="text-sm text-green">
              {validMessage}
            </div>
          ) : showDefaultMessage ? (
            <div className="text-sm text-gray-700">
              {defaultMessage}
            </div>
          ) : null}
          {limit !== undefined && (
            <div className="text-sm ml-auto">
              {value.length} / {limit}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export const PercentageIMaskOptions: FactoryOpts = {
  mask: '% num',
  lazy: true,
  eager: true,
  blocks: {
    num: {
      lazy: false,
      eager: false,
      mask: Number,
      max: 99,
      min: 1,
      maxLength: 2,
      scale: 0,
    }
  },
}

type getCurrencyIMaskOptionsProps = {
  min?: number;
  max?: number;
  allowFloat?: boolean;
}

export const getCurrencyIMaskOptions = (props: getCurrencyIMaskOptionsProps) => {
  const {
    min,
    max,
    allowFloat,
  } = props;

  const partialOptions: FactoryOpts = {
    mask: '₺ num',
    lazy: true,
    eager: true,
    blocks: {
      num: allowFloat ? {
        lazy: false,
        min: min,
        max: max,
        mask: Number,
        thousandsSeparator: '.',
        radix: ',',
        scale: 2,
        padFractionalZeros: true,
        mapToRadix: [','],
      } : {
        lazy: false,
        min: min,
        max: max,
        mask: Number,
        thousandsSeparator: '.',
        scale: 0,
      }
    },
  }

  return partialOptions;
}

export const IntegerIMaskOptions: FactoryOpts = {
  mask: 'num',
  lazy: true,
  eager: true,
  blocks: {
    num: {
      lazy: false,
      eager: false,
      mask: Number,
      thousandsSeparator: '.',
      scale: 0,
    }
  },
}

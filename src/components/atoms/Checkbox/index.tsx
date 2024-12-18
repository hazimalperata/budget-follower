import clsx from "clsx";
import styles from "./index.module.scss";
import React, {useMemo} from "react";
import {CheckboxPreset, CheckboxProps} from "@/components/atoms/Checkbox/types";


export default function Checkbox(props: CheckboxProps) {
  const {
    label,
    checked,
    setChecked,
    isDisabled,
    indeterminate,
    labelClassName,
    containerStyle,
    tabIndex,
    containerClassName = '',
    checkboxPreset = CheckboxPreset.Blue,
  } = props;

  const preset = useMemo(() => {
    switch (checkboxPreset) {
      case CheckboxPreset.Blue:
        return styles.blueCheckbox;
      case CheckboxPreset.Red:
        return styles.redCheckbox;
    }
  }, [checkboxPreset])

  return (
    <label className={clsx("flex flex-row items-center gap-x-[5px] w-fit", containerClassName)} style={containerStyle}>
      <input
        ref={input => {
          if (input) {
            input.indeterminate = !!indeterminate;
          }
        }}
        checked={checked}
        disabled={isDisabled}
        type="checkbox"
        onChange={({target: {checked}}) => !isDisabled ? setChecked(checked) : undefined}
        tabIndex={tabIndex}
        className={clsx("appearance-none bg-white min-w-4 min-h-4 rounded-md",
          styles.checkbox,
          preset,
          {
            [styles.isDisabled]: isDisabled
          }
        )}
      />
      {label !== undefined && <div className={clsx("text-sm select-none", labelClassName, {
        "cursor-pointer": !isDisabled,
      })}>{label}</div>}
    </label>
  )
}

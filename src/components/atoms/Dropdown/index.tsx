import {autoUpdate, flip, offset, size, useClick, useDismiss, useFloating, useInteractions, useRole} from "@floating-ui/react";
import React, {createContext, useMemo, useState} from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import DropdownMenu from "@/components/atoms/Dropdown/DropdownMenu";
import {MdArrowDropDown} from "react-icons/md";
import {DropdownProps} from "@/components/atoms/Dropdown/types";

export enum DropdownPreset {
  Outline,
  Borderless,
}

export type CustomDropdownContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (bol: boolean) => void;
}

export const CustomDropdownContext = createContext<CustomDropdownContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => null,
});

export default function Dropdown<T>(props: DropdownProps<T>) {
  const {
    placeholder = "Seçin",
    dropdownSize = 'large',
    leftIcon,
    dropdownPreset,
    isDisabled,
    selectedOption,
    setSelectedOption,
    multiple,
    label,
    isRequired,
    className,
    style,
    options,
    forceShowError,
    isLoading,
    containerStyle,
    containerClassName,
    ...rest
  } = props;

  const MENU_GAP = 5;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const showError = useMemo(() => (forceShowError ? true : isBlurred) && isRequired && selectedOption === undefined, [forceShowError, isBlurred, isRequired, selectedOption]);

  const {refs, floatingStyles, context} = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    middleware: [
      flip(),
      offset(MENU_GAP),
      size({
        apply({rects, elements}) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      })
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const {getReferenceProps, getFloatingProps} = useInteractions([
    click,
    dismiss,
    role
  ]);

  const preset = useMemo(() => {
    switch (dropdownPreset) {
      case DropdownPreset.Borderless:
        return styles.borderlessPreset;
      case DropdownPreset.Outline:
        return styles.outlinePreset;
    }
  }, [dropdownPreset]);

  const dropdownSizeClassName = useMemo(() => {
    switch (dropdownSize) {
      case 'large':
        return styles.largeDropdown;
      case 'medium':
        return styles.mediumDropdown;
      case 'small':
        return styles.smallDropdown;
    }
  }, [dropdownSize]);

  return (
    <CustomDropdownContext.Provider value={{isMenuOpen, setIsMenuOpen}}>
      <label className={clsx("flex flex-col gap-y-[5px]", containerClassName)} style={containerStyle}>
        {label !== undefined && <div className="text-sm">{label} {isRequired && <span className="text-red-400"> *</span>}</div>}
        {isLoading ? (
          <div className="pulse h-10"/>
        ) : (
          <button
            {...getReferenceProps()}
            ref={refs.setReference}
            disabled={isDisabled}
            className={clsx(
              styles.customDropdown,
              dropdownSizeClassName,
              isMenuOpen && styles.isOpen,
              isDisabled && styles.isDisabled,
              showError && styles.hasError,
              preset,
              className,
            )}
            onClick={isDisabled ? undefined : () => setIsMenuOpen(x => !x)}
            onBlur={() => setIsBlurred(true)}
            style={style}
          >
            <div className="flex flex-row items-center text-start gap-x-[5px] overflow-hidden w-full">
              {leftIcon !== undefined && leftIcon}
              <div className={`${styles.dropdownText} ${(multiple ? selectedOption?.length > 0 : selectedOption !== undefined) ? styles.isSelected : ''} three-dot`}>
                {multiple ? (
                  (selectedOption === undefined || selectedOption?.length === 0) ? placeholder : selectedOption.map(x => x.value).join(' - ')
                ) : selectedOption ? selectedOption.value : placeholder}
              </div>
            </div>
            <MdArrowDropDown width={16} height={16} className="transition-all duration-200" style={{minWidth: 16, minHeight: 16, transform: isMenuOpen ? "scaleY(-1)" : "scaleY(1)"}}/>
          </button>
        )}
      </label>
      {isMenuOpen && (
        <div
          ref={refs.setFloating}
          className="z-overlay"
          style={{...floatingStyles}}
          {...getFloatingProps()}
        >
          {multiple ? (
            <DropdownMenu<T>
              selected={selectedOption}
              multiple={true}
              setIsMenuOpen={setIsMenuOpen}
              setSelected={setSelectedOption}
              options={options}
              {...rest}
            />
          ) : (
            <DropdownMenu<T>
              selected={selectedOption}
              multiple={false}
              setIsMenuOpen={setIsMenuOpen}
              setSelected={setSelectedOption}
              options={options}
              {...rest}
            />
          )}
        </div>
      )}
    </CustomDropdownContext.Provider>
  )
}

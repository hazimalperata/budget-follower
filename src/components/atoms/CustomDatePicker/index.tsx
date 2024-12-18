import React, {forwardRef, useEffect, useState} from "react";
import DatePicker, {CalendarContainer, registerLocale} from "react-datepicker";
import {tr} from "date-fns/locale";
import styles from "./index.module.scss";
import {getDateString} from "@/utils/date";
import clsx from "clsx";
import {set} from "date-fns";
import Button from "@/components/atoms/Button";
import {MdCalendarMonth} from "react-icons/md";
import {CustomDatePickerProps} from "@/components/atoms/CustomDatePicker/types";

registerLocale("tr", tr);

export default function CustomDatePicker(props: CustomDatePickerProps) {
  const {setSelectedDate, shouldCloseOnSelect = false, disabled, selectedDate, customPlacement} = props;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showWithPortal, setShowWithPortal] = useState(false);


  const onChangePicker = (date: Date | null) => {
    if (date) {
      const clearedStart = set(date, {hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
      setSelectedDate(clearedStart);
    } else {
      setSelectedDate(undefined);
    }
    if (shouldCloseOnSelect) {
      setIsCalendarOpen(false);
    }
  }

  const PickerContainer = ({className, children}: { className: string, children: React.JSX.Element }) => {
    return (
      <div className="flex flex-row bg-background rounded-xl select-none overflow-hidden border border-gray-300 shadow-modal">
        <CalendarContainer className={clsx(className)}>
          <div className="custom-container flex flex-col relative">{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  const PickerInput = forwardRef<HTMLButtonElement, { onClick?: () => void, inputText?: string }>(function PickerInput({onClick}, ref) {
    return (
      <button
        className={clsx("flex flex-row items-center gap-x-[5px] py-[5px] px-[11px] border border-gray-300 bg-background hover:bg-gray-50 rounded-lg w-fit cursor-pointer font-medium text-sm select-none whitespace-nowrap", {
          "bg-gray-50 dark:bg-gray-700": isCalendarOpen,
        })}
        onClick={onClick}
        ref={ref}
      >
        {selectedDate ? (
          <div className="w-full">{selectedDate ? getDateString(selectedDate).replaceAll('.', '/') : ""}</div>
        ) : (
          <div className="w-full text-center">Seçin</div>
        )}
        <MdCalendarMonth height={16} width={16} style={{minWidth: 16}}/>
      </button>
    )
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setShowWithPortal(window.innerWidth <= 768);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={clsx(styles.customPicker, "z-overlay")}>
      <DatePicker
        shouldCloseOnSelect={shouldCloseOnSelect}
        disabled={disabled}
        customInput={<PickerInput/>}
        dateFormat="d MMMM yyyy"
        locale="tr"
        onInputClick={() => setIsCalendarOpen(true)}
        onClickOutside={() => setIsCalendarOpen(false)}
        selected={selectedDate}
        showPopperArrow={false}
        open={isCalendarOpen}
        onChange={onChangePicker}
        calendarContainer={PickerContainer}
        popperPlacement={customPlacement}
        withPortal={showWithPortal}
      >
        <div className="flex justify-end mb-5 mx-6">
          <Button
            label="Temizle"
            size="small"
            disabled={selectedDate === null}
            variant="filledRed"
            onClick={() => {
              if (!selectedDate) {
                return;
              }
              setSelectedDate(undefined);
            }}
          />
        </div>
      </DatePicker>
    </div>
  )
}

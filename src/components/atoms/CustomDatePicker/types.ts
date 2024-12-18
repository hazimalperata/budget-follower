import {Placement} from "@floating-ui/react";

export type CustomDatePickerProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  shouldCloseOnSelect?: boolean;
  customPlacement?: Placement;
  disabled?: boolean;
}

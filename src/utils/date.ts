import {defaultLocale} from "@/utils/localize";

export function getDateTimeString(date: Date, options?: Intl.DateTimeFormatOptions) {
  return date.toLocaleString(defaultLocale.tag, options);
}

export function getTimeString(date: Date, options?: Intl.DateTimeFormatOptions) {
  return date.toLocaleTimeString(defaultLocale.tag, options);
}

export function getDateString(date: Date, options?: Intl.DateTimeFormatOptions) {
  return date.toLocaleDateString(defaultLocale.tag, options).replaceAll(".", "/");
}

export function getDateWithoutTime(date: Date | null) {
  if (date) {
    return new Date(date.toDateString());
  }
  return null;
}

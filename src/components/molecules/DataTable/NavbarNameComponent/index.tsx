import React from "react";
import {defaultLocale} from "@/utils/localize";
import clsx from "clsx";

type NavbarNameComponentProps = {
  innerNavbarName: string;
  extraClassName: string;
}

export default function NavbarNameComponent({innerNavbarName, extraClassName}: NavbarNameComponentProps) {
  return (
    <div className={clsx("flex-row items-center gap-x-[3px] select-none font-medium text-sm text-white bg-gray-700 px-2 py-[5px] rounded-[5px]", extraClassName)}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="white"/>
        <circle cx="8" cy="8" r="4" fill="white"/>
      </svg>
      <div>{innerNavbarName.toLocaleUpperCase(defaultLocale.tag)}</div>
    </div>
  )
}

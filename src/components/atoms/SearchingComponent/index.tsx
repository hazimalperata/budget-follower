import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {SearchingComponentProps} from "@/components/atoms/SearchingComponent/types";
import {searchingComponentClassName} from "@/components/atoms/SearchingComponent/cva";
import {MdSearch} from "react-icons/md";
import FilterShowElement from "../FilterShowElement";

export default function SearchingComponent(props: SearchingComponentProps) {
  const {placeholder, className, disabled, setDelayedSearchText, tableSearchElement, setTableSearchElement, delayedSearchText, size = "small", round = "rectangle"} = props;

  const [searchText, setSearchText] = useState('');

  const handleSearchInput = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(value);
  }

  useEffect(() => {
    const timeout = setTimeout(() => setDelayedSearchText(searchText), 500);
    return () => clearTimeout(timeout);
  }, [searchText, setDelayedSearchText]);

  useEffect(() => {
    if (delayedSearchText.trim()) {
      setTableSearchElement?.(
        <FilterShowElement key={delayedSearchText} isSearch onRemove={() => {
          setSearchText("");
          setDelayedSearchText("");
        }} value={delayedSearchText}/>
      )
    } else {
      setTableSearchElement?.(undefined);
    }
  }, [delayedSearchText, setDelayedSearchText, setTableSearchElement]);

  return (
    <div
      className={clsx(searchingComponentClassName({size, round}), className, {
        "border-black": tableSearchElement !== undefined,
        "border-gray-300": tableSearchElement === undefined,
      })}>
      <MdSearch width={16} height={16} className="absolute left-2.5 pointer-events-none"/>
      <input disabled={disabled} className={clsx("w-full h-full placeholder:text-gray-700 dark:placeholder:text-gray-200 pr-2.5 pl-8", {
        "rounded-full": round === "fullRounded",
        "rounded-lg": round === "rectangle",
      })} value={searchText} onChange={handleSearchInput}
             placeholder={placeholder ?? "Arama..."}/>
    </div>
  )
}

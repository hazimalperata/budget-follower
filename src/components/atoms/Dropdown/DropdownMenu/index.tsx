import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";
import {useOverlayScrollbars} from "overlayscrollbars-react";
import DropdownOptionElement, {DROPDOWN_OPTION_HEIGHT} from "../DropdownOptionElement";
import {DropdownMenuProps} from "@/components/atoms/Dropdown/DropdownMenu/types";
import SearchingComponent from "@/components/atoms/SearchingComponent";
import {DropdownOption} from "@/components/atoms/Dropdown/DropdownOptionElement/types";

export const ALL_OPTION_KEY = "all";
export const ALL_OPTION = {key: ALL_OPTION_KEY, value: "Tümü"};

export default function DropdownMenu<T>(props: DropdownMenuProps<T>) {
  const {
    selected,
    setSelected,
    options,
    hideSearch,
    stayOpenOnSelect,
    blockReselect,
    initialOptions,
    multiple,
    setIsMenuOpen,
    allOption,
    disableSort,
    shownOptionCount = 5,
  } = props;

  const [searchText, setSearchText] = useState('');

  const rootRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const customSort = useCallback((a: DropdownOption<T>, b: DropdownOption<T>) => {
    let aIndex = -1;
    let bIndex = -1;
    if (multiple) {
      if (a.key === ALL_OPTION_KEY) {
        return -1;
      }
      if (b.key === ALL_OPTION_KEY) {
        return 1;
      }
      aIndex = selected.findIndex(x => x.key === a.key);
      bIndex = selected.findIndex(x => x.key === b.key);
    } else {
      if (selected?.key === a.key) {
        aIndex = 0;
      }
      if (selected?.key === b.key) {
        bIndex = 0;
      }
    }

    if (aIndex !== -1 && bIndex !== -1) {
      return bIndex - aIndex;
    } else if (aIndex !== -1) {
      return -1;
    } else if (bIndex !== -1) {
      return 1;
    } else {
      return 0;
    }
  }, [multiple, selected]);

  const allRows: DropdownOption<T>[] = useMemo(() => {
    let rows: DropdownOption<T>[] = [];

    if (allOption) {
      rows.push({key: ALL_OPTION_KEY, value: "Tümü"});
    }

    if (initialOptions) {
      rows = [...initialOptions];
    }

    if (options) {
      rows = options.filter(option => option.value.toLocaleLowerCase("tr").includes(searchText.toLocaleLowerCase("tr")));
    }
    if (allOption) {
      rows.unshift({key: ALL_OPTION_KEY, value: "Tümü"});
    }
    if (disableSort) {
      return rows;
    }

    return rows.sort(customSort);
  }, [allOption, initialOptions, options, disableSort, customSort, searchText]);

  const shownOptionNumber = useMemo(() => Math.min(shownOptionCount, Math.max(allRows.length, 2)), [allRows.length, shownOptionCount]);

  const [initialize] = useOverlayScrollbars({
    options: {
      overflow: {
        x: "visible",
        y: "scroll"
      },
      scrollbars: {
        theme: 'os-custom-scroll-bar',
      },
    },
    defer: true
  });

  const virtualizer = useVirtualizer({
    count: allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => DROPDOWN_OPTION_HEIGHT,
    overscan: 2,
    debug: process.env.NODE_ENV !== 'production',
  });

  const isOptionSelected = (option: DropdownOption<T>) => {
    if (multiple) {
      return selected?.find(x => x.key === option.key) !== undefined;
    } else {
      return selected?.key === option.key;
    }
  }

  const selectHandle = (option: DropdownOption<T>) => {
    if (multiple) {
      let newList: DropdownOption<T>[] = [];
      if (option.key === ALL_OPTION_KEY) {
        setSelected([ALL_OPTION]);
      } else if (selected?.find(x => x.key === option.key)) {
        newList = selected.filter(x => x.key !== option.key);
        setSelected([...newList]);
      } else {
        selected?.push(option);
        setSelected([...selected]);
        if (selected?.find(x => x.key === ALL_OPTION_KEY)) {
          setSelected([...selected.filter(x => x.key !== ALL_OPTION_KEY)]);
        }
      }
    } else {
      if (blockReselect) {
        setSelected(option);
      } else {
        setSelected(selected?.key === option.key ? undefined : option)
      }
    }
    if (!stayOpenOnSelect) {
      setIsMenuOpen(false);
    }
  }

  useEffect(() => {
    const {current: root} = rootRef;
    const {current: viewport} = parentRef;

    if (root && viewport && allRows.length !== 0) {
      initialize({
        target: root,
        elements: {
          viewport,
        },
      });
    }
  }, [allRows.length, initialize]);

  return (
    <div className="flex flex-col bg-background border border-gray-300 rounded-xl py-1.5 shadow-xl overflow-hidden">
      {!hideSearch && (
        <SearchingComponent
          placeholder="Ara"
          className="my-1.5 mx-2.5"
          delayedSearchText={searchText}
          setDelayedSearchText={setSearchText}
        />
      )}
      <div ref={rootRef}>
        <div ref={parentRef} className="w-full" style={{maxHeight: shownOptionNumber * DROPDOWN_OPTION_HEIGHT}}>
          {(allRows.length === 0) ? (
            <Empty isSearch={!!searchText}/>
          ) : (
            <div
              className="w-full relative"
              style={{
                height: `${virtualizer.getTotalSize()}px`,
              }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const option = allRows[virtualRow.index];

                if (option) {
                  return <DropdownOptionElement
                    key={`option_${option.key}_${virtualRow.index}`}
                    option={option}
                    isSelected={isOptionSelected(option)}
                    onSelect={selectHandle}
                    multiple={multiple}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  />
                } else {
                  return <div
                    className="absolute top-0 left-0 w-full flex items-center justify-center text-13 text-gray-700"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    key={virtualRow.index}>
                    Tüm Seçenekler Yüklenemedi
                  </div>
                }
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Empty({isSearch}: { isSearch?: boolean }) {
  return (
    <div className="py-1.5 px-2.5 text-sm text-center">
      {isSearch ? "Aramalarınıza uygun herhangi bir sonuç bulamadık. Lütfen farklı şekilde deneyin." : "Seçenekler yüklenirken hata oluştu."}
    </div>
  )
}

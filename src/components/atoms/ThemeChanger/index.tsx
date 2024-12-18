'use client'

import {useTheme} from 'next-themes'
import {useCallback, useEffect, useState} from 'react'
import {flushSync} from 'react-dom'
import {MdDarkMode, MdLightMode, MdMonitor} from 'react-icons/md';
import clsx from 'clsx';
import {Theme} from "@/components/atoms/ThemeChanger/types";

export default function ThemeChanger() {
  const [mounted, setMounted] = useState(false);
  const {theme, setTheme} = useTheme();

  const themeOptions: Theme[] = [
    {icon: MdDarkMode, key: 'dark', text: 'Koyu'},
    {icon: MdMonitor, key: 'system', text: 'Sistem'},
    {icon: MdLightMode, key: 'light', text: 'Açık'},
  ]

  const onThemeChange = useCallback((theme: string) => {
    if (!!document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setTheme(theme);
        });
      });
    } else {
      setTheme(theme);
    }
  }, [setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ThemeChangerLoading/>
  }

  return (
    <div className="relative flex flex-row rounded-full border border-transparent hover:border-gray-500 dark:hover:border-gray-300 gap-x-1 group transition-all h-[42px] w-[42px] hover:w-[118px] overflow-hidden">
      {themeOptions.map((option, index) => (
        <button
          key={option.key}
          onClick={() => onThemeChange(option.key)}
          disabled={theme === option.key}
          title={option.text}
          className={clsx("p-2 rounded-full transition-all absolute m-1 left-0", {
            "bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-700 z-1": theme === option.key,
            "hover:bg-gray-500 dark:hover:bg-gray-200 hover:text-gray-200 dark:hover:text-black opacity-0 group-hover:opacity-100": theme !== option.key,
            "group-hover:left-[38px]": index === 1,
            "group-hover:left-[76px]": index === 2,
          })}
        >
          {option.icon({fontSize: 18})}
        </button>
      ))}
    </div>
  )
}

function ThemeChangerLoading() {
  return (
    <div role="status" className="animate-pulse">
      <div className="h-[42px] bg-gray-300 rounded-full dark:bg-gray-600 w-[42px]"></div>
      <span className="sr-only">Yükleniyor...</span>
    </div>
  )
}

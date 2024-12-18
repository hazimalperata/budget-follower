'use client'

import React, {useMemo} from "react";
import {LinkItemProps} from "@/components/molecules/NavigationSideBar/LinkItem/types";
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";

export default function LinkItem(props: LinkItemProps) {
  const {href, icon, text} = props;

  const pathName = usePathname();

  const isActive = useMemo(() => href === pathName, [href, pathName]);

  return (
    <Link href={href} className="relative px-6">
      <div className={clsx("absolute h-full w-3 rounded-full bg-blue-500 transition-all duration-200 delay-1000", {
        "-left-1.5": isActive,
        "-left-full": !isActive,
      })}
      />
      <div className={clsx("flex flex-row items-center gap-x-5 pl-2 py-4 rounded-lg transition-all duration-200", {
        "bg-blue-500 text-white": isActive
      })}>
        {icon}
        {text}
      </div>
    </Link>
  )
}

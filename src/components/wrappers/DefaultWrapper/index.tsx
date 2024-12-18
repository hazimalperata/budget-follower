import React from "react";
import NavigationSidebar from "@/components/molecules/NavigationSideBar";
import {DefaultWrapperProps} from "@/components/wrappers/DefaultWrapper/types";
import Navbar from "@/components/molecules/Navbar";

export default function DefaultWrapper({children}: DefaultWrapperProps) {
  return (
    <div className="flex flex-row min-h-screen">
      <NavigationSidebar/>
      <div className="relative flex flex-col w-full bg-gray-100 dark:bg-gray-900 min-w-0">
        <Navbar/>
        {children}
      </div>
    </div>
  )
}

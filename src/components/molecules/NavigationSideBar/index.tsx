'use client'

import ThemeChanger from "@/components/atoms/ThemeChanger";
import React from "react";
import MainLogo from "@/icons";
import LinkItem from "@/components/molecules/NavigationSideBar/LinkItem";
import Divider from "@/components/molecules/NavigationSideBar/Divider";
import {MdImageAspectRatio, MdImageSearch} from "react-icons/md";
import {LinkItemProps} from "@/components/molecules/NavigationSideBar/LinkItem/types";
import {Pages} from "@/constants/pages";
import {useAppSelector} from "@/lib/hooks";

const NavigationSidebar = () => {
  const {isNavbarOpen} = useAppSelector((state) => state.navbarReducer);

  const navigationItems: LinkItemProps[][] = [
    [
      {href: Pages.Index, text: "Raporlar", icon: <MdImageSearch/>},
    ],
    [
      {href: Pages.Categories, text: "Kategoriler", icon: <MdImageAspectRatio/>},
      {href: Pages.Transactions, text: "Kayıtlar", icon: <MdImageAspectRatio/>},
    ]
  ]


  return (
    <aside className="relative transition-all duration-200" style={{minWidth: isNavbarOpen ? 200 : 0}}>
      <nav className="fixed flex flex-col bg-background h-screen top-0 left-0 w-[200px] border-gray-300 border-r">
        <MainLogo className="mx-auto my-6"/>
        {navigationItems.map((itemGroup, index) => (
          <React.Fragment key={itemGroup.map(x => x.href).join("/")}>
            {itemGroup.map((item) => (
              <LinkItem
                key={item.href}
                {...item}
              />
            ))}
            {index !== navigationItems.length - 1 && (
              <Divider key={`divider-${itemGroup.map(x => x.href)}${index}`}/>
            )}
          </React.Fragment>
        ))}
        <div className="flex flex-row place-content-end mt-auto p-4">
          <ThemeChanger/>
        </div>
      </nav>
    </aside>
  )
}

export default NavigationSidebar;

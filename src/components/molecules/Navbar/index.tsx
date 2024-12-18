'use client'

import {setNavbarVisibility, toggleNavbar} from "@/lib/features/navbar/navbarSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import Button from "@/components/atoms/Button";
import {MdMenu} from "react-icons/md";
import clsx from "clsx";

export default function Navbar() {

  const dispatch = useAppDispatch();
  const {isNavbarOpen} = useAppSelector((state) => state.navbarReducer);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        dispatch(setNavbarVisibility(false));
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
  };

  return (
    <header className="min-h-[72px]">
      <div className={clsx("fixed flex flex-row items-center justify-between bg-background px-8 py-6 border-b border-gray-300 z-dropdown", {
        "min-w-[calc(100vw-200px)]": isNavbarOpen,
        "w-full": !isNavbarOpen
      })}>
        <Button onClick={handleToggleNavbar} variant="borderless" size="medium" icon={MdMenu}/>
        <div className="text-xl">
          Hoşgeldiniz
        </div>
      </div>
    </header>
  )
}

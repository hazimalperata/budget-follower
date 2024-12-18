import "@/styles/global.scss";
import "@/styles/tailwind.css";
import "react-datepicker/dist/react-datepicker.css";
import type {Metadata} from "next";
import {ThemeProvider} from "next-themes";
import React from "react";
import clsx from "clsx";
import {inter} from "@/app/fonts";
import ModalRoot from "../components/molecules/ModalRoot";
import StoreProvider from "@/app/StoreProvider";
import AlertController from "../modules/AlertController";
import {NotificationToastProvider} from "../components/molecules/NotificationToast";


export const metadata: Metadata = {
  title: "BudgetFollower",
  description: "Best app for your budget",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
    <body className={clsx(inter.className, "antialiased")}>
    <ThemeProvider>
      <NotificationToastProvider>
        <StoreProvider>
          <ModalRoot/>
          {children}
          <AlertController/>
        </StoreProvider>
      </NotificationToastProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}

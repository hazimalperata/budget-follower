'use client'

import React, {useCallback, useMemo} from "react";
import {Slide, toast, ToastContainer, ToastOptions} from 'react-toastify';
import {NotificationContainer, NotificationType} from "./container";
import {inter} from "@/app/fonts";

type NotificationButton = {
  text: string;
  onClick: (closeToast: () => void) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export enum NotificationPosition {
  Bottom,
  Right,
}

export type NotificationCreate = {
  title: string;
  type?: NotificationType,
  position?: NotificationPosition,
  body?: string;
  buttons?: NotificationButton[];
  id?: string;
}

export type NotificationToastContextType = {
  showNotification: (notification: NotificationCreate) => void;
}

export const NotificationToastContext = React.createContext<NotificationToastContextType>({
  showNotification: () => null,
});

export function NotificationToastProvider(props: { children: React.JSX.Element | React.JSX.Element[] }) {
  const bottomProps: ToastOptions = useMemo(() => ({containerId: 'bottom'}), []);

  const rightProps: ToastOptions = useMemo(() => ({containerId: 'right'}), []);

  const getProps = useCallback((pos: NotificationPosition | undefined) => {
    switch (pos) {
      case NotificationPosition.Right:
        return rightProps;
      default:
        return bottomProps;
    }
  }, [bottomProps, rightProps]);

  const showNotification = useCallback((notificationCreate: NotificationCreate) => {
    toast<NotificationCreate>(NotificationContainer, {...getProps(notificationCreate.position), toastId: notificationCreate.id, data: notificationCreate});
  }, [getProps]);

  return (
    <NotificationToastContext.Provider value={{showNotification}}>
      <ToastContainer
        containerId="right"
        position="top-right"
        autoClose={false}
        hideProgressBar
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
        transition={Slide}
        toastClassName={`${inter.className} flex flex-row items-center gap-x-[5px] rounded-lg select-none bg-background text-foreground shadow-xl`}
        toastStyle={{boxShadow: "0px 7px 24px 0px rgba(0, 0, 0, 0.1)", padding: 15}}
      />
      <ToastContainer
        containerId="bottom"
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
        transition={Slide}
        toastClassName={`${inter.className} flex flex-row items-center justify-center gap-x-[5px] rounded-lg select-none bg-background text-foreground h-9 mr-auto border border-gray-200`}
        toastStyle={{boxShadow: "0px 7px 24px 0px rgba(0, 0, 0, 0.1)", padding: '7.5px 15.5px'}}
      />
      {props.children}
    </NotificationToastContext.Provider>
  )
}


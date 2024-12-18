import React from "react";
import {ToastContentProps} from "react-toastify";
import {NotificationCreate, NotificationPosition} from "./index";
import {CloseIcon, ErrorIcon, InfoIcon, SuccessIcon, WarningIcon} from "./icons";

export enum NotificationType {
  Info,
  Success,
  Warning,
  Error,
  Default,
}

export const NotificationContainer = ({closeToast, data}: ToastContentProps<NotificationCreate>) => {
  const {type = NotificationType.Default, position = NotificationPosition.Bottom} = data;

  const getIcon = () => {
    switch (type) {
      case NotificationType.Info:
        return <InfoIcon isRightIcon={position === NotificationPosition.Right}/>
      case NotificationType.Error:
        return <ErrorIcon isRightIcon={position === NotificationPosition.Right}/>
      case NotificationType.Warning:
        return <WarningIcon isRightIcon={position === NotificationPosition.Right}/>
      case NotificationType.Success:
        return <SuccessIcon isRightIcon={position === NotificationPosition.Right}/>
      default:
        return;
    }
  }

  if (position === NotificationPosition.Right) {
    return (
      <div className="flex flex-row gap-x-[5px] max-w-[347px]">
        {getIcon()}
        <div className="flex-1 flex flex-col gap-y-[5px]">
          <div className="font-medium text-sm">
            {data.title}
          </div>
          {data.body ? (
            <div className="text-xs">
              {data.body}
            </div>
          ) : null}
          {data.buttons ? (
            <div className="flex flex-row items-center gap-x-[15px]">
              {data.buttons?.map((button, index) => (
                <button key={index} disabled={button.isDisabled} onClick={() => button.onClick(closeToast)} className="text-xs font-medium underline">
                  {button.text}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <CloseIcon onClick={closeToast}/>
      </div>
    )
  }

  return (
    <div className="flex flex-row items-center gap-5px select-none">
      {getIcon()}
      <div className="text-tiny leading-5 font-normal whitespace-nowrap text-black-700">
        {data.title}
      </div>
    </div>
  )
}

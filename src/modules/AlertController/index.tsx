'use client'

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useContext, useEffect} from "react";
import {NotificationPosition, NotificationToastContext, NotificationToastContextType} from "../../components/molecules/NotificationToast";
import {NotificationType} from "@/components/molecules/NotificationToast/container";
import {checkAlertsForCategory, setToggleAlertSeen} from "@/lib/features/categories/categorySlice";

export default function AlertController() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categoryReducer.categories);
  const transactions = useAppSelector((state) => state.transactionReducer.transactions);

  const {showNotification} = useContext<NotificationToastContextType>(NotificationToastContext);

  useEffect(() => {
    categories.forEach((category) => {
      dispatch(checkAlertsForCategory({categoryId: category.id, transactions: Object.values(transactions)}));
    })
  }, [dispatch, transactions]);

  useEffect(() => {
    categories.forEach((category) => {
      category.alerts.forEach(alert => {
        if (alert.isActive && alert.isSeen === undefined) {
          showNotification({
            id: `${alert.id}`,
            position: NotificationPosition.Right,
            type: NotificationType.Warning,
            title: "Limit Uyarısı",
            body: `${category.name} için belirlediğiniz yüzdelik limitlerden %${alert.percentage} aktif oldu.`,
            buttons: [
              {
                text: "Alarm'ı devre dışı bırak",
                onClick: (closeToast) => {
                  dispatch(setToggleAlertSeen({categoryId: category.id, alertId: alert.id}));
                  closeToast();
                }
              }
            ]
          })
        }
      })
    })
  }, [categories, dispatch, showNotification]);

  return null;
}

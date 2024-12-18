import {CategoryAlert} from "@/types/categoryAlert";
import {useAppDispatch} from "@/lib/hooks";
import {setToggleAlertSeen} from "@/lib/features/categories/categorySlice";

type CategoryAlertsCellProps = {
  alerts: CategoryAlert[];
  categoryId: string;
}

export default function CategoryAlertsCell({alerts, categoryId}: CategoryAlertsCellProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-y-[5px] cursor-pointer">
      {alerts.map(alert => (
        <div key={alert.id} onClick={() => dispatch(setToggleAlertSeen({categoryId, alertId: alert.id}))}>
          % {alert.percentage} - {alert.isSeen ? 'Devre Dışı' : alert.isActive ? 'Aktif' : 'Pasif'}
        </div>
      ))}
    </div>
  )
}

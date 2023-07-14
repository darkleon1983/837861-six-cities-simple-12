import { useAppDispatch, useAppSelector } from '../../hooks';
import { getNotifications } from '../../store/notification/selector';
import { ToastOptions, toast } from 'react-toastify';
import { INotification } from '../../types/notification';
import { clearNotification } from '../../store/notification/notification';

function Notification(): JSX.Element {
  const notifications = useAppSelector(getNotifications);
  const dispatch = useAppDispatch();

  const renderNotification = () => {
    notifications.forEach((notification: INotification) => {
      const toastOptions: ToastOptions = {
        autoClose: notification.duration || 4000,
        toastId: notification.id,
        onClose: () => dispatch(clearNotification(notification.id)),
      };

      if (toast.isActive(notification.id)) {
        return;
      }

      switch (notification.type) {
        case 'error':
          toast.error(notification.message, toastOptions);
          break;
        case 'success':
          toast.success(notification.message, toastOptions);
          break;
        case 'info':
          toast.info(notification.message, toastOptions);
          break;
        case 'warning':
          toast.warn(notification.message, toastOptions);
          break;
        default:
          return null;
      }
    });
  };
  return <>{renderNotification()}</>;
}

export default Notification;


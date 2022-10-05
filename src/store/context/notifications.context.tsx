import React from 'react';
import ReactDOM from 'react-dom';

import {
  NotificationContainer,
  ToastNotification
} from '../../components/UI/Notification';
import { Alert } from '../../models/notification.model';
import { DEFAULT_NOTIFICATION_DURATION } from '../../utils/constants';

type Notification = {
  message: string;
  type: Alert;
  duration?: number;
};

interface NotificationState {
  notifications: Array<Notification>;
  pushNotification: (notification: Notification) => number;
  popNotification: (id: number) => void;
}

const NotificationContext = React.createContext<NotificationState>({
  notifications: [],
  pushNotification: (notification: Notification) => 0,
  popNotification: (id: number) => {}
});

export const NotificationContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = React.useState<
    Array<Notification & { id: number }>
  >([]);

  const pushNotification = React.useCallback((notification: Notification) => {
    const toastNotification = {
      ...notification,
      id: Math.floor(Math.random() * 1000)
    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      toastNotification
    ]);

    const interval = setInterval(() => {
      setNotifications(
        notifications.filter((n) => n.message !== notification.message)
      );
      clearInterval(interval);
    }, notification.duration || DEFAULT_NOTIFICATION_DURATION);

    return toastNotification.id;
  }, []);

  const popNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const pauseTimerHandler = function (e: React.MouseEvent) {
    console.log(e);
  };

  const contextValue: NotificationState = {
    notifications,
    pushNotification,
    popNotification
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {ReactDOM.createPortal(
        <NotificationContainer>
          {notifications.map((notification, index) => (
            <ToastNotification key={index} {...notification} />
          ))}
        </NotificationContainer>,
        document.getElementById('notifications-root') as HTMLElement
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

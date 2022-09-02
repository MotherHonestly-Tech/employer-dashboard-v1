import React from 'react';
import ReactDOM from 'react-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';

import { ReactComponent as CheckCircleFillIcon } from '../../static/svg/check-circle-fill.svg';
import { ReactComponent as ErrorFillIcon } from '../../static/svg/x-circle-fill.svg';
import { ReactComponent as WarningFillIcon } from '../../static/svg/exclamation-triangle-fill.svg';
import { DEFAULT_NOTIFICATION_DURATION } from '../../utils/constants';
import { Alert } from '../../models/notification.model';
import usePageVisibility from '../../hooks/use-page-visibility';

type NotificationProps = {
  message: string;
  type: Alert;
  duration?: number;
};

/**
 *
 * @desc Custom Notification component
 *
 **/

const TOAST_TYPES: Array<{
  type: Alert;
  iconEl: React.ReactElement;
  background: string;
}> = [
  {
    type: 'success',
    iconEl: <CheckCircleFillIcon color="#2d832d" />,
    background: '#edf7ed'
  },
  {
    type: 'error',
    iconEl: <ErrorFillIcon color="#f87171" />,
    background: '#fee2e2'
  },
  {
    type: 'warning',
    iconEl: <WarningFillIcon color="#fb923c" />,
    background: '#ffedd5'
  }
];

export const NotificationContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 20,
  maxWidth: 700,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: theme.zIndex.modal + 1100
}));

const Toast = styled(Stack)<{ background: string }>(
  ({ theme, background }) => ({
    background: background,
    position: 'relative',
    marginBottom: '8px',
    padding: '8px 16px',
    borderRadius: '8px'
  })
);

export const ToastNotification = ({
  type,
  message,
  duration
}: NotificationProps) => {
  const isVisible = usePageVisibility();
  const toast = TOAST_TYPES.find((t) => t.type === type);

  if (!toast) {
    return null;
  }

  // React.useEffect(() => {
  //   let timerId = setTimeout(function () {
  //     setVisible(false);
  //   }, duration || DEFAULT_NOTIFICATION_DURATION);

  //   return () => {
  //     clearTimeout(timerId);
  //   };
  // }, [visible, duration]);

  // if (!visible) {
  //   return null;
  // }
  return (
    <Slide
      direction="down"
      in
      mountOnEnter
      unmountOnExit
      easing={{
        enter: 'ease-in'
      }}>
      <Toast
        direction="row"
        spacing={2}
        alignItems="center"
        background={toast.background}>
        {toast.iconEl}
        <Typography variant="body1" color="textPrimary">
          {message}
        </Typography>
      </Toast>
    </Slide>
  );
};

const Notification = ({
  type,
  message,
  duration
}: {
  type: Alert;
  message: string;
  duration?: number;
}) => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    let timerId = setTimeout(function () {
      setVisible(false);
    }, duration || DEFAULT_NOTIFICATION_DURATION);

    return () => {
      clearTimeout(timerId);
    };
  }, [visible, duration]);

  return (
    <React.Fragment>
      {visible &&
        ReactDOM.createPortal(
          <NotificationContainer>
            {visible && (
              <ToastNotification
                type={type}
                message={message}
                duration={duration}
              />
            )}
          </NotificationContainer>,
          document.getElementById('notifications-root') as HTMLElement
        )}
    </React.Fragment>
  );
};

export default Notification;

// const Notifications = ({ type, message, duration }: NotificationProps) => {
//   const [notifications, setNotifications] = React.useState<
//     Array<NotificationEl>
//   >([]);

//   let iconEl: React.ReactElement | null = null;
//   let bgColor: string | null = null;

//   switch (type) {
//     case 'success':
//       iconEl = <CheckCircleFillIcon color="#2d832d" />;
//       bgColor = '#edf7ed';
//       break;
//     case 'error':
//       iconEl = <ErrorFillIcon color="#f87171" />;
//       bgColor = '#fee2e2';
//       break;
//     case 'warning':
//       iconEl = <WarningFillIcon color="#fb923c" />;
//       bgColor = '#ffedd5';
//       break;
//   }

//   React.useEffect(() => {
//     setNotifications([
//       ...notifications,
//       { type, message, duration, iconEl, bgColor }
//     ]);
//     let timerId = setTimeout(() => {
//       setNotifications(notifications.filter((n) => n.message !== message));
//     }, duration || DEFAULT_NOTIFICATION_DURATION);
//     return () => {
//       clearTimeout(timerId);
//     };
//   }, [type, message, notifications, duration, iconEl, bgColor]);

//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         top: 20,
//         maxWidth: 700,
//         left: '50%',
//         transform: 'translateX(-50%)',
//         zIndex: (theme) => theme.zIndex.modal + 1100
//       }}>
//       {notifications.map((notification) => (
//         <Slide
//           direction="down"
//           in
//           mountOnEnter
//           unmountOnExit
//           easing={{
//             enter: 'ease-in'
//           }}>
//           <Stack
//             direction="row"
//             spacing={2}
//             alignItems="center"
//             sx={{
//               px: 2,
//               py: 1,
//               borderRadius: 2,
//               backgroundColor: notification.bgColor
//             }}>
//             {notification.iconEl}
//             <Typography variant="body1" color="textPrimary">
//               {notification.message}
//             </Typography>
//           </Stack>
//         </Slide>
//       ))}
//     </Box>
//   );
// };

// export const pushNotification = (
//   message: string,
//   type: Alert,
//   duration?: number
// ) => {
//   return {
//     renderNotification: () => <Notification {...{ message, type, duration }} />
//   };
// };

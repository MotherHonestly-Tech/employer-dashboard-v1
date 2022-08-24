export type Alert = 'success' | 'error' | 'warning';

type NotificationProps = {
  message: string;
  type: Alert;
  duration?: number;
};

interface NotificationEl extends NotificationProps {
  iconEl: React.ReactElement | null;
  bgColor: string | null;
}
export type EmployeeData = {
  id: number;
  name: string;
  title: string;
  email?: string;
  totalPayout?: number;
  recentPayout?: number;
  recentPayoutDate?: string;
  recentPayoutCareCategory?: string;
  isOnboarded?: boolean;
};

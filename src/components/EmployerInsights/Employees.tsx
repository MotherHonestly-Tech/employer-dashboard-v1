import React from 'react';

import MuiLink from '@mui/material/Link';

import MHDataTable, { GridColDef } from '../DataTable/MHDataTable';

type Employee = {
  id: number;
  name: string;
  title: string;
  totalPayout: number;
  recentPayout: number;
  recentPayoutDate: string;
  recentPayoutCareCategory: string;
};

const Employees = () => {
  const EMPLOYEES: Employee[] = [
    {
      id: 1,
      name: 'Sarah Jane',
      title: 'Unit Mgr',
      totalPayout: 3000,
      recentPayout: 120,
      recentPayoutDate: '12/11/2022',
      recentPayoutCareCategory: 'Child care'
    },
    {
      id: 2,
      name: 'Alexander Wolfe',
      title: 'SE',
      totalPayout: 3000,
      recentPayout: 120,
      recentPayoutDate: '12/11/2022',
      recentPayoutCareCategory: 'Child care'
    },
    {
      id: 3,
      name: 'Maxine Huos',
      title: 'Accountant',
      totalPayout: 3000,
      recentPayout: 120,
      recentPayoutDate: '12/11/2022',
      recentPayoutCareCategory: 'Child care'
    },
    {
      id: 4,
      name: 'Randy Jillian',
      title: 'Accountant',
      totalPayout: 3000,
      recentPayout: 120,
      recentPayoutDate: '12/11/2022',
      recentPayoutCareCategory: 'Child care'
    },
    {
      id: 5,
      name: 'Winona Ryder',
      title: 'IT Architect',
      totalPayout: 3000,
      recentPayout: 120,
      recentPayoutDate: '12/11/2022',
      recentPayoutCareCategory: 'Child care'
    },
    {
      id: 6,
      name: 'Jim Hopper',
      title: 'IT Admin',
      totalPayout: 3000,
      recentPayout: 120,
      recentPayoutDate: '12/11/2022',
      recentPayoutCareCategory: 'Child care'
    },
  ];

  const columns: GridColDef<Employee>[] = [
    {
      headerName: 'Name',
      type: 'text',
      field: 'name',
      width: 300
    },
    {
      headerName: 'Title',
      type: 'text',
      field: 'title',
      width: 200
    },
    {
      headerName: 'Total Payout',
      type: 'text',
      field: 'totalPayout',
      width: 200
    },
    {
      headerName: 'Recent Payout',
      type: 'text',
      field: 'recentPayout',
      width: 200
    },
    {
      headerName: 'Recent Payout Date',
      type: 'text',
      field: 'recentPayoutDate',
      width: 200
    },
    {
      headerName: 'Recent Payout Care Category',
      type: 'text',
      field: 'recentPayoutCareCategory',
      width: 200
    },
    {
      headerName: 'Action',
      type: 'text',
      field: '',
      width: 150,
      align: 'center',
      cellRenderer: (row: Employee) => (
        <MuiLink
          sx={{
            display: 'block',
            cursor: 'pointer',
            my: 2
          }}
          onClick={() => {}}>
          View
        </MuiLink>
      )
    }
  ];

  return <MHDataTable rows={EMPLOYEES} columns={columns} frontEndPagination />;
};

export default Employees;

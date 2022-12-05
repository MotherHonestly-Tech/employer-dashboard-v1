import React from 'react';

import MuiLink from '@mui/material/Link';

import MHDataTable, { GridColDef } from '../DataTable/MHDataTable';
import { EmployeeData } from '../../models/employee.model';
import EmployeeModal from './EmployeeModal';

const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = React.useState<any>(null);

  const EMPLOYEES: EmployeeData[] = [
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
    }
  ];

  const columns: GridColDef<EmployeeData>[] = [
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
      headerName: 'Recent Payout Category',
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
      cellRenderer: (row: EmployeeData) => (
        <MuiLink
          color="#3C72FF"
          sx={{
            display: 'block',
            cursor: 'pointer'
            // my: 2
          }}
          onClick={handleOpen.bind(null, row)}>
          View
        </MuiLink>
      )
    }
  ];

  const [open, setOpen] = React.useState(false);

  const handleOpen = (employee: any) => {
    setOpen(true);
    setSelectedEmployee(employee);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <MHDataTable
        title="Employee Details"
        rows={EMPLOYEES}
        columns={columns}
        frontEndPagination
      />

      <EmployeeModal
        open={open}
        onClose={handleClose}
        employee={selectedEmployee}
      />
    </React.Fragment>
  );
};

export default Employees;

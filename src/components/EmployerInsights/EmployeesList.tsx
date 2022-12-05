import React from 'react';

import Box from '@mui/material/Box';

import MHDialog from '../Dialog/MHDialog';
import MHDataTable, { GridColDef } from '../DataTable/MHDataTable';
import StackedIconWithText from '../UI/StackedIconWithText';

import { ReactComponent as CheckIconMd } from '../../static/svg/check-mark-md.svg';
import { ReactComponent as CancelIcon } from '../../static/svg/cancel.svg';
import { EmployeeData } from '../../models/employee.model';

const EmployeesList = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const EMPLOYEES: EmployeeData[] = [
    {
      id: 1,
      name: 'Sarah Jane',
      email: 'sarahj@mail.com',
      title: 'Unit Mgr',
      isOnboarded: true
    },
    {
      id: 2,
      name: 'Alexander Wolfe',
      email: 'alexw@mail.com',
      title: 'SE',
      isOnboarded: true
    },
    {
      id: 3,
      name: 'Maxine Huos',
      email: 'maxh@mail.com',
      title: 'Accountant',
      isOnboarded: true
    },
    {
      id: 4,
      name: 'Randy Jillian',
      email: 'randyj@mail.com',
      title: 'Accountant',
      isOnboarded: false
    },
    {
      id: 5,
      name: 'Winona Ryder',
      email: 'winr@mail.com',
      title: 'IT Architect',
      isOnboarded: false
    },
    {
      id: 6,
      name: 'Jim Hopper',
      email: 'jimh@mail.com',
      title: 'IT Admin',
      isOnboarded: true
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
      headerName: 'Email',
      type: 'text',
      field: 'email',
      width: 200
    },
    {
      headerName: 'Title',
      type: 'text',
      field: 'title',
      width: 200
    },
    {
      headerName: 'Action',
      type: 'text',
      field: '',
      width: 150,
      align: 'center',
      cellRenderer: (row: EmployeeData) => (
        <Box
          p={1.5}
          borderRadius={2}
          bgcolor={row.isOnboarded ? '#E6FFEE' : '#FFE6E6'}>
          <StackedIconWithText
            justifyContent="center"
            alignItems="center"
            spacing={2}> 
            <Box pr={1}>
            {row.isOnboarded ? <CheckIconMd color="#00BD40" width=".9rem" /> : <CancelIcon color="#FF0000" width=".9rem" />}
            </Box>
            {row.isOnboarded ? 'Onboarded' : 'Pending'}
          </StackedIconWithText>
        </Box>
      )
    }
  ];

  return (
    <MHDialog
      title="Employees"
      open={open}
      handleClose={onClose}
      scroll="paper"
      maxWidth="md">
      <MHDataTable
        title="Employees"
        rows={EMPLOYEES}
        columns={columns}
        frontEndPagination
      />
    </MHDialog>
  );
};

export default EmployeesList;

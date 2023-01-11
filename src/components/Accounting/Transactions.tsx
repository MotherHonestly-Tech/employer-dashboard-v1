import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';

import MHDataTable, { GridColDef } from '../DataTable/MHDataTable';
import { formatAmount } from '../../utils/utils';

const Widget = (props: { title: string; figure: number }) => {
  return (
    <Box bgcolor="#ffffff" borderRadius={2} p={2}>
      <Typography variant="subtitle2" fontSize=".8rem" gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="h1" gutterBottom>
        {formatAmount(props.figure)}
      </Typography>
    </Box>
  );
};

type TransactionData = {
  id: number;
  name: string;
  status: string;
  amount: number;
  description: string;
  date: string;
};

const TRANSACTIONS: TransactionData[] = [
  {
    id: 1,
    name: 'Sarah Jane',
    status: 'Unit Mgr',
    amount: 3000,
    date: '12/11/2022',
    description: 'Child care'
  },
  {
    id: 2,
    name: 'Alexander Wolfe',
    status: 'SE',
    amount: 3000,
    date: '12/11/2022',
    description: 'Child care'
  },
  {
    id: 3,
    name: 'Maxine Huos',
    status: 'Accountant',
    amount: 3000,
    date: '12/11/2022',
    description: 'Child care'
  },
  {
    id: 4,
    name: 'Randy Jillian',
    status: 'Accountant',
    amount: 3000,
    date: '12/11/2022',
    description: 'Child care'
  },
  {
    id: 5,
    name: 'Winona Ryder',
    status: 'IT Architect',
    amount: 3000,
    date: '12/11/2022',
    description: 'Child care'
  },
  {
    id: 6,
    name: 'Jim Hopper',
    status: 'IT Admin',
    amount: 3000,
    date: '12/11/2022',
    description: 'Child care'
  }
];

const Transactions = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (employee: any) => {
    setOpen(true);
    // setSelectedEmployee(employee);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns: GridColDef<TransactionData>[] = [
    {
      headerName: 'Name',
      type: 'text',
      field: 'name',
      width: 300
    },
    {
      headerName: 'Status',
      type: 'text',
      field: 'status',
      width: 200
    },
    {
      headerName: 'Amount',
      type: 'text',
      field: 'amount',
      width: 200,
      valueGetter: (row: TransactionData) => formatAmount(row.amount)
    },
    {
      headerName: 'Date',
      type: 'text',
      field: 'date',
      width: 200
    },
    {
      headerName: 'Description',
      type: 'text',
      field: 'description',
      width: 200
    },
    {
      headerName: 'Action',
      type: 'text',
      field: '',
      width: 150,
      align: 'center',
      cellRenderer: (row: TransactionData) => (
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

  return (
    <div>
      <Box bgcolor="#F9F9F9" minHeight={175} borderRadius={2} p={3} mb={6}>
        <Typography variant="subtitle1" fontSize=".85rem" mb={2}>
          Disbursement Details
        </Typography>

        <Grid container columnSpacing={1}>
          <Grid item xs>
            <Widget title="Benefit Requested" figure={2981} />
          </Grid>
          <Grid item xs>
            <Widget title="Wallet Disbursed" figure={9901} />
          </Grid>
          <Grid item xs>
            <Widget title="Total Disbursed" figure={9901} />
          </Grid>
        </Grid>
      </Box>

      <MHDataTable
        title="Transaction Details"
        rows={TRANSACTIONS}
        columns={columns}
        frontEndPagination
        showResults
      />
    </div>
  );
};

export default Transactions;

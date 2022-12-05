import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chart from '../UI/Chart';

const DUMMY_EXPENSES = [
  {
    id: 'e7',
    title: 'Car Insurance',
    amount: 694.67,
    date: new Date(2021, 0, 28)
  },
  {
    id: 'e5',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 1, 28)
  },
  {
    id: 'e6',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 3, 28)
  },
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 194.12,
    date: new Date(2020, 7, 14)
  },
  {
    id: 'e2',
    title: 'New TV',
    amount: 899.49,
    date: new Date(2021, 6, 12)
  },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28)
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12)
  }
];

const ExpenseOverview = () => {
  const chartDataOptions = new Array(12).fill(0).map((_, i) => {
    return {
      value: 0,
      label: new Date(2022, i, 1).toLocaleString('default', {
        month: 'short'
      })
    };
  });

  for (const expense of DUMMY_EXPENSES) {
    const expenseMonthIndex = expense.date.getMonth();
    chartDataOptions[expenseMonthIndex].value = expense.amount;
  }

  // console.log(chartDataOptions);

  return (
    <Box py={4} px={3} my={4} bgcolor="#F9F9F9">
      <Stack direction="row" spacing={2}>
        <Paper
          sx={{
            p: 3,
            flexGrow: 1,
            borderRadius: (theme) => theme.shape.borderRadius
          }}>
          <Typography
            variant="subtitle1"
            fontSize="1rem"
            align="left"
            paragraph>
            Employee Monthly Spend Overview
          </Typography>

          <Chart dataPoints={chartDataOptions} />
        </Paper>

        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: (theme) => theme.shape.borderRadius
          }}>
          <Box p={4}>
            <Typography variant="h1" fontSize="2.4rem" gutterBottom>
              $20,000
            </Typography>
            <Typography
              variant="body2"
              fontSize=".7rem"
              color="#6B6B6B"
              gutterBottom>
              Total Spent budget
            </Typography>
            <Typography variant="body2" fontSize=".65rem" color="#B7B7B7">
              02/07/2022
            </Typography>
          </Box>

          <Divider light />

          <Box p={4}>
            <Typography variant="h1" fontSize="2.4rem" gutterBottom>
              $18,720
            </Typography>
            <Typography
              variant="body2"
              fontSize=".7rem"
              color="#6B6B6B"
              gutterBottom>
              Total Expense Reimbursed
            </Typography>
            <Typography variant="body2" fontSize=".65rem" color="#B7B7B7">
              02/10/2022
            </Typography>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default ExpenseOverview;

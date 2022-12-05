import React from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';

import MHButton from '../Button/MHButton';
import MHDataTable, { GridColDef } from '../DataTable/MHDataTable';

import { ReactComponent as OverlayIcon } from '../../static/svg/overlay.svg';
import { formatAmount } from '../../utils/utils';
import OverlayContainer from '../UI/OverlayContainer';

type Subscription = {
  id: number;
  item: string;
  employeeSize: number;
  walletAllocation: number;
  serviceCharge: number;
  tax: number;
  total: number;
};

const TextWidget = ({
  title,
  description,
  includeColon
}: {
  title?: string;
  description?: string;
  includeColon?: boolean;
}) => {
  return (
    <Box mb={0}>
      {title && (
        <Typography
          variant="body2"
          fontFamily="Area-Normal-Black"
          color="primary.main"
          display="inline-block">
          {title}
        </Typography>
      )}
      {includeColon ? ': ' : ''}
      {description && (
        <Typography variant="body2" color="primary.main" display="inline-block">
          {description}
        </Typography>
      )}
    </Box>
  );
};

const Pricing = ({ title, amount }: { title: string; amount: number }) => (
  <Grid container mb={1}>
    <Grid item xs={6}>
      <Typography>{title}</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography
        variant="body1"
        fontFamily="Area-Normal-Black"
        color="primary.main">
        {formatAmount(amount)}
      </Typography>
    </Grid>
  </Grid>
);

const PricingGrid = ({ total }: { total: number }) => {
  return (
    <Box width={200}>
      <Typography
        variant="body1"
        fontFamily="Area-Normal-Black"
        color="primary.main"
        gutterBottom>
        Sub Total
      </Typography>
      <Pricing title="Discount" amount={0.0} />
      <Pricing title="Tax" amount={0.0} />

      <Divider light sx={{ mb: 1 }} />

      <Pricing title="Total" amount={total} />
    </Box>
  );
};

const Invoice = () => {
  const columns: Array<GridColDef<Subscription>> = [
    {
      type: 'text',
      field: 'item',
      headerName: 'Item Description',
      width: 150
    },
    {
      type: 'text',
      field: 'employeeSize',
      headerName: 'No of Employees',
      width: 150
    },
    {
      type: 'text',
      field: 'walletAllocation',
      headerName: 'Quaterly Allocation',
      width: 150,
      valueGetter: (row: Subscription) => formatAmount(row.walletAllocation)
    },
    {
      type: 'text',
      field: 'serviceCharge',
      headerName: 'Service Charge',
      width: 150,
      valueGetter: (row: Subscription) => formatAmount(row.serviceCharge)
    },
    {
      type: 'text',
      field: 'tax',
      headerName: 'Tax',
      width: 100,
      valueGetter: (row: Subscription) => formatAmount(row.tax)
    },
    {
      type: 'text',
      field: 'total',
      headerName: 'Total',
      width: 100,
      valueGetter: (row: Subscription) => formatAmount(row.total)
    }
  ];

  const rows: Subscription[] = [
    {
      id: 1,
      item: 'MH Work-Life Wallet Allocation',
      employeeSize: 15000,
      walletAllocation: 5479000,
      serviceCharge: 200,
      tax: 150,
      total: 9096858
    }
  ];

  return (
    <Box maxWidth={'md'} mx="auto">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="secondary.main"
        borderRadius={2}
        p={3}
        position="relative">
        <OverlayContainer
          element={<OverlayIcon />}
          sx={{
            top: -30,
            left: -20
          }}
        />

        <Box alignSelf="flex-start">
          <TextWidget title="Invoice Number" />
          <TextWidget title="INV-2022-010" />
          {/* <TextWidget title="Issued Date: " description="19 Sept 2022" />
          <TextWidget title="Due Date: " description="27 Dec 2022" /> */}
        </Box>
        <Box alignSelf="flex-end" width={150}>
          <TextWidget title="Billed to" />
          <TextWidget description="Mother Honestly" />
          <TextWidget description="Detroit, Michigan, USA" />
          {/* <TextWidget description="Moonlight Sunlight" /> */}
        </Box>
      </Stack>

      <Box my={6}>
        {/* <Typography
          variant="body1"
          color="primary.main"
          fontFamily="Area-Normal-Black"
          gutterBottom
          my={2}>
          Item Details
        </Typography> */}
        <MHDataTable
          title="Item Details"
          rows={rows}
          columns={columns}
          frontEndPagination
          hidePagination
        />
      </Box>

      <Stack direction="row" justifyContent="space-between">
        <Box>
          <TextWidget title="Payment to" />
          <TextWidget title="Account" description='MH Work-Life' includeColon />
          {/* <TextWidget title="Payment to" /> */}

          <Box aria-label="org" sx={{ mt: 3 }}>
            <MuiLink
              component="button"
              underline="always"
              sx={{
                display: 'block',
                mb: 3
              }}>
              Send to email
            </MuiLink>
          </Box>
        </Box>

        <Box>
          <PricingGrid total={9048658} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Invoice;

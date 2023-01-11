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
import MHInvoiceTable, { GridColDef } from '../DataTable/MHInvoiceTable';

import { ReactComponent as OverlayIcon } from '../../static/svg/overlay.svg';
import { formatAmount } from '../../utils/utils';
import OverlayContainer from '../UI/OverlayContainer';
import { Category } from '../../models/wallet.model';

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
    <Box mb={0.6}>
      {title && (
        <Typography
          variant="body2"
          fontFamily="Area-Normal-Black"
          color="primary.main"
          display="inline-block"
          mr={0.5}>
          {title}{' '}
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

const PricingGrid = ({ title, amount }: { title: string; amount: number }) => (
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

const Pricing = ({ total }: { total: number }) => {
  return (
    <Box width={250}>
      <Typography
        variant="body1"
        fontFamily="Area-Normal-Black"
        color="primary.main"
        gutterBottom>
        Sub Total
      </Typography>
      <PricingGrid title="Discount" amount={0.0} />
      <PricingGrid title="Tax" amount={0.0} />

      <Divider light sx={{ mb: 1 }} />

      <PricingGrid title="Monthly Total" amount={total} />

      <Divider light sx={{ mb: 1 }} />

      <PricingGrid title="Quarterly Total" amount={total * 3} />
    </Box>
  );
};

const Invoice = ({ allocationBuckets }: { allocationBuckets: readonly Category[] }) => {
  const columns: Array<GridColDef<Subscription>> = [
    {
      type: 'text',
      field: 'item',
      headerName: 'Item Description',
      width: 130
    },
    {
      type: 'text',
      field: 'employeeSize',
      headerName: 'No of Employees',
      width: 100
    },
    {
      type: 'text',
      field: 'walletAllocation',
      headerName: 'Monthly Allocation',
      width: 150,
      valueGetter: (row: Subscription) => formatAmount(row.walletAllocation)
    },
    {
      type: 'text',
      field: 'serviceCharge',
      headerName: 'Service Charge',
      width: 100,
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

  let rows = allocationBuckets
    .map((bucket, index) => {
      return {
        id: ++index,
        item: bucket.categoryName,
        employeeSize: 116,
        walletAllocation: bucket.allocation,
        serviceCharge: 0,
        tax: 0,
        total: bucket.allocation * 116
      };
    })
    .filter((row) => row.walletAllocation);

  return (
    <Box maxWidth={'md'} mx="auto">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="secondary.main"
        borderRadius={2}
        p={3}>
        <Box>
          <TextWidget title="MH Work-Life Wallet" />
          <TextWidget title="Invoice Number" />
          <TextWidget title="INV-2022-010" />
          <TextWidget
            title="Issued Date: "
            description={
              ' ' +
              new Date().toLocaleDateString('en-US', {
                day: 'numeric',
                year: 'numeric',
                month: 'short'
              })
            }
          />
          {/* <TextWidget title="Due Date: " description="27 Dec 2022" /> */}
        </Box>
        <Box>
          <TextWidget title="Billed to" />
          {/* <TextWidget description={employer?.companyName} />
          <TextWidget description={`${employer?.city}, ${employer?.state}`} />
          <TextWidget description={employer?.zipCode} /> */}
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
        <MHInvoiceTable rows={rows} columns={columns} />
      </Box>

      <Stack direction="row" justifyContent="space-between">
        <Box>
          <TextWidget title="Payment to" />
          <TextWidget title="Account" description="MH Work-Life" includeColon />
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
          <Pricing total={56475} />
        </Box>

      </Stack>
    </Box>
  );
};

export default Invoice;

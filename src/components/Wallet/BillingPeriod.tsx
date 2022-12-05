import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { addDaysToDate, constructBillingDateFormat } from '../../utils/utils';

const BillingPeriod = () => {
  return (
    <Box bgcolor="#F5F5F5" p={2} mt={2}>
          <Typography variant="body1" align="center" color="primary.main">
            Quarterly billing starting from period dated{' '}
            <Typography
              component="span"
              fontFamily={'Area-Normal-Black'}
              color="primary.main">
              {constructBillingDateFormat(new Date())}
            </Typography>{' '}
            to{' '}
            <Typography
              component="span"
              fontFamily={'Area-Normal-Black'}
              color="primary.main">
              {constructBillingDateFormat(addDaysToDate(new Date(), 90))}
            </Typography>
          </Typography>
        </Box>
  )
}

export default BillingPeriod
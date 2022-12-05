import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

import StackedContainer from './StackedContainerStyled';

const GridItem = styled(Box)(({ theme }) => ({
  // ...theme.typography.body2,
  backgroundColor: '#ffffff',
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  // flex: '1 1 auto',
  display: 'flex',
  justifyContent: 'center'
}));

const AllocationPerPeriod = () => {
  return (
    <StackedContainer
      divider={
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            height: '60px',
            alignSelf: 'center'
          }}
        />
      }
      my={2}>
      <GridItem>
        <Box>
          <Typography variant="body2" fontSize={12} color="primary">
            Monthly Total Allocation
          </Typography>
          <Typography
            variant="body1"
            fontSize={24}
            fontFamily="Area-Normal-Black"
            color="primary">
            {/* {formatAmount(monthlyAllocation)} */}
            $78,000
          </Typography>
        </Box>
      </GridItem>
      <GridItem>
        <Box>
          <Typography variant="body2" fontSize={12} color="primary">
            Allocation for a quarter
          </Typography>
          <Typography
            variant="body1"
            fontSize={24}
            fontFamily="Area-Normal-Black"
            color="primary">
            {/* {formatAmount(quarterlyAllocation)} */}
            $78,000
          </Typography>
        </Box>
      </GridItem>
    </StackedContainer>
  );
};

export default AllocationPerPeriod;

import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import StackedContainer from './StackedContainerStyled';
import { ReactComponent as DollarIcon } from '../../static/svg/dollar.svg';
import { ALLOCATION_FIELDS } from '../../utils/constants';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: '#F4F4F4',
  paddingInline: 5,
  paddingBlock: 8,
  ...theme.typography.body2
}));

const SummaryGridItem = (props: { title: string; amount: number }) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      width="100%"
      py={.2}
      sx={{
        marginTop: '0 !important'
      }}
      >
      <Item flexGrow={2}>{props.title}</Item>
      <Item width={20}>
        <DollarIcon />
      </Item>
      <Item minWidth={100}>{props.amount}</Item>
    </Stack>
  );
};

const SUMMARY_ITEMS = ['Anything', ...ALLOCATION_FIELDS, 'Total'];

const AllocationSummary = () => {
  return (
    <StackedContainer direction="column" alignItems="flex-start">
      <Box p={2}>
        <Typography variant="subtitle2" fontSize=".8rem">
          Payment Summary
        </Typography>
      </Box>

      {SUMMARY_ITEMS.map((item) => (
        <SummaryGridItem key={item} title={item} amount={0} />
      ))}
    </StackedContainer>
  );
};

export default AllocationSummary;

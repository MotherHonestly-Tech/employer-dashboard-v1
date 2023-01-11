import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import StackedContainer from './StackedContainerStyled';
import { ReactComponent as DollarIcon } from '../../static/svg/dollar.svg';
import { ALLOCATION_FIELDS } from '../../utils/constants';
import { Category } from '../../models/wallet.model';
import { formatNumber } from '../../utils/utils';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: '#F4F4F4',
  paddingInline: 5,
  paddingBlock: 8,
  ...theme.typography.body2,
  fontSize: '.75rem',
  '&:nth-of-type(1)': {
    paddingInline: 15
  }
}));

const SummaryGridItem = (props: { title: string; amount: number }) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      width="100%"
      py={0.2}
      sx={{
        marginTop: '0 !important'
      }}>
      <Item flexGrow={2}>{props.title}</Item>
      <Item width={20}>
        <DollarIcon />
      </Item>
      <Item minWidth={150}>
        {props.amount ? formatNumber(props.amount, 2) : 0}
      </Item>
    </Stack>
  );
};

const AllocationSummary = ({
  allocationFields
}: {
  allocationFields: readonly Category[];
}) => {
  const TOTAL = allocationFields.reduce(
    (prev, current, index) => prev + current.allocation,
    0
  );

  return (
    <StackedContainer direction="column" alignItems="flex-start">
      <Box p={2}>
        <Typography variant="subtitle2" fontSize=".8rem">
          Payment Summary
        </Typography>
      </Box>

      {allocationFields.map((field) => (
        <SummaryGridItem
          key={field.id}
          title={field.categoryName}
          amount={field.allocation}
        />
      ))}
      <SummaryGridItem key="total" title="Total" amount={TOTAL} />
    </StackedContainer>
  );
};

export default AllocationSummary;

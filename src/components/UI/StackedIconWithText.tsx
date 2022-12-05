import React from 'react';

import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const StackedIconWithText = styled((props: StackProps) => <Stack {...props} direction="row" />)(
  ({ theme }) => ({
    alignItems: 'center'
  })
);

export default StackedIconWithText;

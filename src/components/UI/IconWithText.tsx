import React from 'react';

import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const IconWithText = styled((props: any) => <Stack {...props} direction="row" />)(
  ({ theme }) => ({
    alignItems: 'center'
  })
);

export default IconWithText;

import React from 'react';

import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const IconWithText = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center'
}));

export default IconWithText;
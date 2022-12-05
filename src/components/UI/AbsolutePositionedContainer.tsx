import React from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const AbsolutePositionedContainer = styled(Box)<{ defaultPos?: boolean }>(
  ({ theme, defaultPos }) => ({
    position: 'absolute',
    ...(!defaultPos && {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    })
  })
);

export default AbsolutePositionedContainer;

import React from 'react';

import Stack from '@mui/material/Stack';

import { ReactComponent as ArrowLeftStretchedIcon } from '../../static/svg/arrow-left-stretched.svg';
import { ReactComponent as ArrowRightStretchedIcon } from '../../static/svg/arrow-right-stretched.svg';

const ArrowPanelBar = ({ onLeft, onRight } : { onLeft: () => void; onRight: () => void;}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      sx={{
        '& > svg': {
          cursor: 'pointer'
        }
      }}>
      <ArrowLeftStretchedIcon onClick={onLeft} />
      <ArrowRightStretchedIcon onClick={onRight} />
    </Stack>
  );
};

export default ArrowPanelBar;

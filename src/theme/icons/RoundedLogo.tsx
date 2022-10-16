import React from 'react';

import Box from '@mui/material/Box';

import { FnComponent } from '../../models/component.model';

const RoundedLogoIcon: FnComponent<{ sx?: object }> = (props) => {
  return (
    <Box
      component="div"
      sx={{
        borderRadius: '50%',
        width: 40,
        height: 40,
        backgroundColor: (theme) => theme.palette.grey[600],
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        ...props.sx
      }}>
      {props.children}
    </Box>
  );
};

export default RoundedLogoIcon;

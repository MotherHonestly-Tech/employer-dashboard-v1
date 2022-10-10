import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import { ReactComponent as InfoIcon } from '../../static/svg/info.svg';

const InfoText = ({ message }: { message: string }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <RoundedLogoIcon sx={{
        width: 18,
        height: 18,
      }}>
        <InfoIcon />
      </RoundedLogoIcon>

      <Typography variant="body2" color="#194049" fontSize=".6rem">
        {message}
      </Typography>
    </Stack>
  );
};

export default InfoText;

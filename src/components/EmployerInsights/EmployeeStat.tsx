import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { formatNumber } from '../../utils/utils';

export type EmployeeStatProps = {
  theme: 'dark' | 'light';
  icon: React.ReactElement;
  title: string;
  stat: number;
  containerSx?: SxProps<Theme>;
};

const EmployeeStat = ({ theme, icon, title, stat, ...props }: EmployeeStatProps) => {
  return (
    <Box
      p={3}
      bgcolor={theme === 'dark' ? 'primary.main' : 'common.white'}
      borderRadius={2}
      boxShadow="0px 5px 26px rgba(197, 216, 222, 0.25)"
      minHeight={180}
      sx={{
        ...props.containerSx
      }}>
      {icon}
      <Typography
        variant="body2"
        color={theme === 'dark' ? 'common.white' : 'primary.main'}
        gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="h1"
        color={theme === 'dark' ? 'common.white' : 'primary.main'}>
        {formatNumber(stat)}
      </Typography>
    </Box>
  );
};

export default EmployeeStat;

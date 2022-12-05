import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ReactComponent as CaretDownIcon } from '../../static/svg/chevron-down.svg';
import IconWithText from '../UI/StackedIconWithText';

const Dropdown = () => {
  return (
    <IconWithText>
      <Typography>Sort By</Typography>
      <CaretDownIcon />
    </IconWithText>
  );
};

const SearchFilter = () => {
  return <div>SearchFilter</div>;
};

export default SearchFilter;

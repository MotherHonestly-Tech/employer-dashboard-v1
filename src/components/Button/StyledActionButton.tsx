import { styled } from '@mui/material/styles';

import MHButton from './MHButton';

const StyledActionButton = styled(MHButton)(({ theme }) => ({
  fontSize: '12px',
  padding: '5px 12px',
  position: 'relative',
  '& svg': {
    mr: 1
  },
  '&:hover svg': {
    color: theme.palette.primary.main
  }
}));

export default StyledActionButton;

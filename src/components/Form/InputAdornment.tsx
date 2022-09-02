import { styled } from '@mui/material/styles';

const InputAdornment = styled('div')<{ applyPadding?: boolean }>(
  ({ applyPadding }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(applyPadding ? { padding: '0 .5rem' } : {})
  })
);

export default InputAdornment;

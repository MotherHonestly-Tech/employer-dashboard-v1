import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const StackedContainer = styled((props: StackProps) => (
  <Stack
    direction="row"
    alignItems={'center'}
    justifyContent="space-evenly"
    border={1}
    borderColor="#BBBBBB"
    spacing={2}
    overflow="hidden"
    {...props}
  />
))(({ theme }) => ({}));

export default StackedContainer;
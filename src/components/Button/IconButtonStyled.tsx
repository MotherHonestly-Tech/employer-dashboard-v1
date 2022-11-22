import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/material/styles';

const IconButtonStyled = styled(ButtonUnstyled)(
  ({ theme, style }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;

  &:focus{
    outline: none;
  }

  &:active{
    outline: none;
  }

  ...({
    ...style
  })
`
);

export default IconButtonStyled;

import React from 'react';

import { styled } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const grey = {
  100: '#E0E3E7',
  300: '#CDD2D7',
  700: '#3E5060',
  900: '#1A2027'
};

const StyledInput = styled('input')<{}>(
  ({ theme }) => `
    font-family: Area-Normal-Semibold;
    font-size: 0.75rem;
    box-sizing: border-box;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    text-align: left;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    outline: none;    
    &:hover {
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[300]};
    }
  `
);

const StyledContainer = styled('div')<{}>(
  ({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    border: 1px solid ${grey[100]};
    box-sizing: border-box;
    padding: 10px;
    line-height: 1.5;
    margin-bottom: 1.25rem;
  `
);

const MHDatePicker = () => {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label="date-picker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <StyledContainer>
            <StyledInput ref={inputRef} {...inputProps} size={10} />
            {InputProps?.endAdornment}
          </StyledContainer>
        )}
      />
    </LocalizationProvider>
  );
};

export default MHDatePicker;

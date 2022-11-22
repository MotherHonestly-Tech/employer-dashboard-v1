import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import MHDialog from '../Dialog/MHDialog';
import MHFormControl from '../Form/MHFormControl';
import StyledActionButton from '../Button/StyledActionButton';
import useInputArray from '../../hooks/use-input-array';

import * as validators from '../../utils/validators';
import { ReactComponent as PlusIcon } from '../../static/svg/plus.svg';
import { ReactComponent as CancelIcon } from '../../static/svg/cancel.svg';
import IconButtonStyled from '../Button/IconButtonStyled';

const AddEmployees = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { inputFields, onChange, addField, removeField } = useInputArray([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  React.useEffect(() => {
    addField();
  }, []);

  return (
    <MHDialog
      title="Add Employees"
      open={open}
      handleClose={onClose}
      maxWidth={'sm'}
      scroll="paper"
      fullWidth>
      <Box component="form">
        {inputFields.map((field, i) => (
          <Stack
            key={i}
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              '& > div': {
                flexGrow: 1
              }
            }}>
            <MHFormControl
              type="email"
              id={'email' + i}
              label="Email Address"
              placeholder="Enter work email address"
              value={field.value}
              onChange={(e) => onChange(e, i)}
            />
            {inputFields.length > 1 && (
              <IconButtonStyled
                onClick={removeField.bind(null, i)}
                sx={{
                  padding: 13,
                  bgcolor: '#e8e8e8',
                  width: 20,
                  height: 20,
                  borderRadius: '50%'
                }}>
                <CancelIcon width=".8rem" />
              </IconButtonStyled>
            )}
          </Stack>
        ))}
      </Box>

      <StyledActionButton
        variant="outlined"
        startIcon={<PlusIcon />}
        sx={{
          width: 100
        }}
        onClick={addField}>
        Add
      </StyledActionButton>
    </MHDialog>
  );
};

export default AddEmployees;

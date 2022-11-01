import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SelectOption } from '@mui/base';

import MHDialog from '../Dialog/MHDialog';
import MHButton from '../Button/MHButton';
import MHFormControl from '../Form/MHFormControl';
import { MHSelect } from '../Form/MHSelect';
import useInput from '../../hooks/use-input';

import * as validators from '../../utils/validators';
import * as constants from '../../utils/constants';
import { ReactComponent as CheckMarkRoundedLargeIcon } from '../../static/svg/check-mark-rounded-lg.svg';

const AddMember = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {
    value: enteredEmail,
    valid: enteredEmailIsValid,
    error: enteredEmailHasError,
    onChange: emailInputChangeHandler,
    onBlur: emailInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    },
    {
      validator: (value: string) => validators.email(value)
    }
  ]);

  const {
    value: enteredRole,
    valid: enteredRoleIsValid,
    error: enteredRoleHasError,
    onChange: roleInputChangeHandler,
    onBlur: roleInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const [completed, setCompleted] = React.useState(false);

  React.useEffect(() => {
    setCompleted(false);
  }, []);

  const renderOption = (option: SelectOption<string>) => {
    let subtitle = '';

    switch (option.value.trim().toLowerCase()) {
      case 'admin':
        subtitle = 'Can manage members, allocate funds to wallet';
        break;
      case 'member':
        subtitle = 'Can assist with certain administrative tasks';
        break;
      default:
        subtitle = '';
        break;
    }

    return (
      <>
        <Typography variant="body2">{option.label}</Typography>
        <Typography variant="body2" fontSize=".7rem">
          {subtitle}
        </Typography>
      </>
    );
  };

  function renderValue(option: SelectOption<string> | null) {
    let content = null;

    if (!option) {
      return content;
    }

    content = option.value;
    return content;
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!enteredEmailIsValid || !enteredRoleIsValid) {
      return;
    }

    setCompleted(true);
  };

  return (
    <MHDialog
      title={!completed ? 'Add New Member' : ' '}
      open={open}
      handleClose={onClose}
      actions={
        !completed ? (
          <MHButton type="submit" form="add-member-form" fullWidth>
            Send Invite
          </MHButton>
        ) : (
          <MHButton onClick={onClose} fullWidth>Close</MHButton>
        )
      }
      maxWidth={!completed ? 'sm' : 'xs'}
      scroll="paper"
      fullWidth>
      {!completed ? (
        <Box component="form" id="add-member-form" onSubmit={handleSubmit}>
          <MHFormControl
            id="employee-email"
            type="email"
            placeholder="Email address"
            label="Email address"
            value={enteredEmail}
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
          />

          <MHSelect
            label="Role"
            placeholder="Select Role"
            options={constants.ROLES}
            optionRenderer={renderOption}
            renderValue={renderValue}
            value={enteredRole}
            onChange={(val) => roleInputChangeHandler(val as string)}
            onBlur={roleInputBlurHandler}
          />
        </Box>
      ) : (
        <Box
          sx={{
            px: 2,
            '& svg': {
              display: 'block',
              marginX: 'auto',
              marginY: '30px'
            }
          }}>
          <CheckMarkRoundedLargeIcon />
          <Typography
            variant="body1"
            align="center"
            color="primary.main"
            gutterBottom
            paragraph>
            Invite sent to {enteredEmail}.
          </Typography>
        </Box>
      )}
    </MHDialog>
  );
};

export default AddMember;

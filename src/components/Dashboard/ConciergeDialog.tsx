import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MHFormControl from '../Form/MHFormControl';
import MHButton from '../Button/MHButton';
import MHDialog from '../Dialog/MHDialog';

import { ReactComponent as SuccessIcon } from '../../static/svg/successDialog.svg';
import { ReactComponent as ChatIcon } from '../../static/svg/chat.svg';

import useInput from '../../hooks/use-input';

import * as validators from '../../utils/validators';

export const DialogBox = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [completed, setCompleted] = React.useState(false);

  const {
    value: enteredTitle,
    valid: enteredTitleIsValid,
    error: titleInputHasError,
    onChange: titleInputChangeHandler,
    onBlur: titleInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredDescription,
    valid: enteredDescriptionIsValid,
    error: descriptionInputHasError,
    onChange: descriptionInputChangeHandler,
    onBlur: descriptionInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!enteredTitleIsValid || !enteredDescriptionIsValid) {
      return;
    }

    setCompleted(true);
  };

  return (
    <>
      <MHDialog
        open={open}
        title={!completed ? 'Request for a concierge service' : ''}
        handleClose={onClose}
        scroll="paper"
        actions={
          !completed ? (
            <MHButton type="submit" form="concierge-request-form" fullWidth>
              Proceed
            </MHButton>
          ) : (
            <MHButton type="button" fullWidth onClick={onClose}>
              Close
            </MHButton>
          )
        }
        maxWidth={completed ? 'xs' : 'sm'}
        fullWidth>
        {!completed ? (
          <Box
            component={'form'}
            onSubmit={submitHandler}
            id="concierge-request-form">
            <MHFormControl
              id="title"
              type="text"
              label="Title"
              placeholder="Enter a title for your request"
              value={enteredTitle}
              onChange={titleInputChangeHandler}
              onBlur={titleInputBlurHandler}
              required
              autoFocus
            />

            <MHFormControl
              id="description"
              type="text"
              label="Description"
              placeholder="Enter a description for your request"
              value={enteredDescription}
              onChange={descriptionInputChangeHandler}
              onBlur={descriptionInputBlurHandler}
              required
              multiline
              rows={4}
            />
          </Box>
        ) : (
          <Box
            sx={{
              margin: 'auto',
              '& svg': {
                display: 'block',
                mx: 'auto',
                mb: 2
              }
            }}>
            <SuccessIcon width={120} />

            <Typography
              variant="body2"
              color="initial"
              align="center"
              mb={3}
              gutterBottom>
              Thank you, your request has been sent. <br /> We will respond
              shortly.
            </Typography>

            <ChatIcon width={50} />

            <Typography
              variant="body2"
              color="initial"
              align="center"
              mb={3}
              gutterBottom>
              Check your Message on your Dashboard
            </Typography>

            <Typography
              variant="body2"
              color="initial"
              align="center"
              mb={3}
              gutterBottom>
              Working hours: <br />
              Mon - Friday | 8am - 6pm (EST)
            </Typography>
          </Box>
        )}
      </MHDialog>
    </>
  );
};

export default DialogBox;

import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import MHButton from '../../components/Button/MHButton';
import MHFormControl from '../../components/Form/MHFormControl';
import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';

import { ReactComponent as KeyIcon } from '../../static/svg/key.svg';
import { FnComponent } from '../../models/component.model';
import { BGImage } from '../../models/background-image.model';
import * as validators from '../../utils/validators';
import { generateRandomString, getURLWithQueryParams } from '../../utils/utils';

const PasswordReset: FnComponent<{
  onRouteChange: (image: BGImage) => void;
}> = (props) => {
  const { onRouteChange } = props;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const history = useHistory();

  const { sendHttpRequest: activateEmp } = useHttp();
  const { loading, error, sendHttpRequest: resetPassword } = useHttp();

  const {
    value: enteredPassword,
    valid: enteredPasswordIsValid,
    error: passwordInputHasError,
    onChange: passwordInputChangeHandler,
    onBlur: passwordInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.password(value)
    }
  ]);

  const {
    value: enteredRepeatPassword,
    valid: enteredRepeatPasswordIsValid,
    error: repeatPasswordInputHasError,
    onChange: repeatPasswordInputChangeHandler,
    onBlur: repeatPaswordInputBlurHandler
  } = useInput([
    {
      validator: (value: string) =>
        validators.matchingFields(value)(enteredPassword)
    }
  ]);

  let passwordErrorTip = passwordInputHasError
    ? 'Minimum of 8 characters, consisting of at least an uppercase letter, a lowercase letter, a number and a special character'
    : undefined;
  let repeatPasswordErrorTip = repeatPasswordInputHasError
    ? 'Passwords must match'
    : undefined;

  let formIsValid = false;

  if (enteredPasswordIsValid && enteredRepeatPasswordIsValid) {
    formIsValid = true;
  }

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657836331/alex-lvrs-4N5huJDOydQ-unsplash_1_1_qubnfw.png',
      imageAlt: 'Lex Lvrs'
    });

    if (token)
      activateEmp(
        process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/activate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({})
        },
        (data: any) => {}
      );
  }, [onRouteChange, activateEmp, token]);

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  const setPasswordHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    preventDefault(event);

    if (!formIsValid) {
      return;
    }

    resetPassword(
      process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/password/new',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          password: enteredPassword
        })
      },
      (data: any) => {
        history.push({
          pathname: `/auth/reset-password/${generateRandomString({ length: 7 })}/success`,
          state: {
            token: token
          }
        });
      }
    );
  };

  return (
    <React.Fragment>
      <Paper
        sx={{
          px: 8,
          py: 5,
          width: '100%'
        }}>
        <Box sx={{}}>
          <RoundedLogoIcon sx={{ mx: 'auto' }}>
            <KeyIcon width="1rem" />
          </RoundedLogoIcon>

          <Typography variant="h3" my={3} align="center" gutterBottom>
            Set new password
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3
              }}>
              {error.message}
            </Alert>
          )}

          <Box
            component={'form'}
            onSubmit={setPasswordHandler}
            autoComplete="off"
            noValidate>
            <MHFormControl
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
              error={passwordErrorTip}
              required
              autoFocus
            />

            <MHFormControl
              id="repeat-password"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              value={enteredRepeatPassword}
              onChange={repeatPasswordInputChangeHandler}
              onBlur={repeatPaswordInputBlurHandler}
              error={repeatPasswordErrorTip}
              required
            />

            <MHButton sx={{}} type="submit" loading={loading} fullWidth>
              Reset password
            </MHButton>
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default PasswordReset;

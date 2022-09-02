import React from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';

import MHButton from '../../components/Button/MHButton';
import MHFormControl from '../../components/Form/MHFormControl';
import InputAdornment from '../../components/Form/InputAdornment';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import useTitle from '../../hooks/use-title';

import { ReactComponent as MailIcon } from '../../static/svg/mail.svg';
import { ReactComponent as InfoRoundedIcon } from '../../static/svg/info-rounded.svg';
import { FnComponent } from '../../models/component.model';
import { BGImage } from '../../models/background-image.model';
import * as validators from '../../utils/validators';
import { HttpResponse } from '../../models/api.interface';
import { EMAIL_FROM } from '../../utils/constants';

const ForgotPassword: FnComponent<{
  onRouteChange: (image: BGImage) => void;
  title: string;
}> = (props) => {
  const { onRouteChange } = props;

  const { loading, error, sendHttpRequest: sendResetLink } = useHttp();
  useTitle(props.title);

  const history = useHistory();

  const {
    value: enteredEmail,
    valid: enteredEmailIsValid,
    error: emailInputHasError,
    onChange: emailInputChangeHandler,
    onBlur: emailInputBlurHandler
  } = useInput([{ validator: (value: string) => validators.email(value) }]);

  const emailErrorTip = emailInputHasError ? 'Please enter a valid email' : '';

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657836148/lawrence-crayton-KXOaNSU63NE-unsplash_1_c4copk.png',
      imageAlt: 'Lwrence Crayton'
    });
  }, [onRouteChange]);

  const sendResetLinkHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailInputHasError && !enteredEmailIsValid) {
      return;
    }

    sendResetLink(
      process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/passwordreset',
      {
        method: 'PUT',
        body: JSON.stringify({
          email: enteredEmail
        })
      },
      (response: HttpResponse<unknown>) => {
        history.push({
          pathname: '/auth/forgot-password/reset-link',
          state: {
            email: enteredEmail
          }
        });
      }
    );
  };

  return (
    <React.Fragment>
      <Paper
        sx={{
          px: 6,
          py: 5,
          width: '100%'
        }}>
        <Box sx={{}}>
          <Typography variant="h1" component="h1" gutterBottom mb={1}>
            Forgot your password?
          </Typography>

          <Typography
            variant="subtitle1"
            color="#6F6F6F"
            component={'div'}
            gutterBottom
            mb={2}>
            Let's get you into your account
          </Typography>

          <Typography variant="body2" component={'div'} gutterBottom mb={3}>
            Submit your email address and we'll send you a link to reset your
            password
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

          <Box component={'form'} onSubmit={sendResetLinkHandler}>
            <MHFormControl
              id="email"
              type="email"
              label="Email address"
              placeholder="Enter your email address"
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
              error={emailErrorTip}
              startAdornment={
                <InputAdornment applyPadding>
                  <MailIcon width="1rem" />
                </InputAdornment>
              }
              required
            />

            <MHButton sx={{}} type="submit" loading={loading} fullWidth>
              Send reset link
            </MHButton>
          </Box>

          <ListItem
            sx={{
              background: '#F3F3F3',
              color: '#6B6B6B',
              mt: 5,
              py: 3
            }}>
            <ListItemAvatar>
              <Avatar
                alt="!"
                sx={{
                  bgcolor: 'transparent'
                }}>
                <InfoRoundedIcon width="100%" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              If you don't receive an email from us within a few minutes, Check
              your spam filter as sometimes they end up in there. The email will
              be from {EMAIL_FROM}
            </ListItemText>
          </ListItem>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default ForgotPassword;

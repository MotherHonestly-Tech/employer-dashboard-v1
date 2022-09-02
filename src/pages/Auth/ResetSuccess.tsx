import React from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import MHButton from '../../components/Button/MHButton';

import { ReactComponent as CheckmarkIcon } from '../../static/svg/check-mark-rounded.svg';
import { ReactComponent as ArrowLeftIcon } from '../../static/svg/arrow-left.svg';
import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import { FnComponent } from '../../models/component.model';
import { BGImage } from '../../models/background-image.model';
import { getURLWithQueryParams } from '../../utils/utils';

const ResetSuccess: FnComponent<{
  onRouteChange: (image: BGImage) => void;
}> = (props) => {
  const { onRouteChange } = props;
  const history = useHistory();

  const location = useLocation<{ token: string }>();

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657836372/youssef-naddam-iJ2IG8ckCpA-unsplash_1_gzadsw.png',
      imageAlt: 'Youssef Naddam'
    });
  }, [onRouteChange]);

  if (!location.state || !location.state.token) {
    return (
      <Redirect
        to={{
          pathname: '/auth/sign-in',
          state: { from: { pathname: 'reset-password' } }
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 8,
          width: '100%',
          maxWidth: 'sm'
        }}>
        <Box
          sx={{
            textAlign: 'center'
          }}>
          <RoundedLogoIcon>
            <CheckmarkIcon width="1rem" />
          </RoundedLogoIcon>

          <Typography variant="h3" my={1} gutterBottom>
            Password reset
          </Typography>

          <Typography variant="body1" mt={2} mb={4} mx="auto" maxWidth={0.75}>
            Your password has been successfully reset. Click below to log in
            magically
          </Typography>

          {/* <h1 className="text-center my-4">Password reset</h1>
          <p className="mb-5">
            Your password has been successfully reset. Click below to log in
            magically
          </p> */}

          <MHButton
            sx={{
              mb: 2
            }}
            onClick={() =>
              history.push(
                getURLWithQueryParams('/auth/sign-in', {
                  verify: '1'
                })
              )
            }
            fullWidth>
            Continue
          </MHButton>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center">
            <ArrowLeftIcon />
            <MuiLink
              component={Link}
              href=""
              to={getURLWithQueryParams('/auth/sign-in', {
                verify: '1'
              })}>
              Back to log in
            </MuiLink>
          </Stack>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default ResetSuccess;

import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import SignIn from '../pages/Auth/SignIn';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetLinkSuccess from '../pages/Auth/ResetLinkSuccess';
import PasswordReset from '../pages/Auth/PasswordReset';
import ResetSuccess from '../pages/Auth/ResetSuccess';
import MHLogoIcon from '../theme/icons/MHLogo';

import { ReactComponent as OrgLogo } from '../static/svg/unilever-logo.svg';

import { FnComponent } from '../models/component.model';
import { theme } from '../theme/mui/dashboard.theme';
import { BGImage } from '../models/background-image.model';
import { Typography } from '@mui/material';

const AuthNavigator: FnComponent = () => {
  const [image, setImage] = React.useState<BGImage>({} as BGImage);
  const backgroundColor = React.useRef(theme.palette.background.default);

  const { path } = useRouteMatch();

  const changeImageHandler = React.useCallback(
    ({ imageSrc, imageAlt, background }: BGImage) => {
      setImage({
        imageSrc,
        imageAlt
      });
      backgroundColor.current = !background
        ? theme.palette.background.default
        : (background as string);
    },
    []
  );

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} sx={{ minHeight: '100vh' }}>
          <Grid
            item
            xs={6}
            sx={{
              backgroundColor: backgroundColor.current,
              position: 'relative'
            }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: '100vh', px: 6 }}>
              <Box position="relative" top={-50}>
                {/* <MHLogoIcon /> */}
                <OrgLogo />
              </Box>
              <Switch>
                <Route path={`${path}/sign-in`}>
                  <SignIn
                    onRouteChange={changeImageHandler}
                    title="Sign in to your account"
                  />
                </Route>
                <Route path={`${path}/forgot-password`} exact>
                  <ForgotPassword
                    onRouteChange={changeImageHandler}
                    title="Forgot Password"
                  />
                </Route>
                <Route path={`${path}/forgot-password/reset-link`} exact>
                  <ResetLinkSuccess onRouteChange={changeImageHandler} />
                </Route>
                <Route path={`${path}/reset-password`} exact>
                  <PasswordReset onRouteChange={changeImageHandler} />
                </Route>
                <Route path={`${path}/reset-password/jdd/success`} exact>
                  <ResetSuccess onRouteChange={changeImageHandler} />
                </Route>

                <Route path={`${path}`} exact>
                  <Redirect to={`${path}/sign-in`} />
                </Route>
                <Route path="*">
                  <Redirect to={`${path}/sign-in`} />
                </Route>
              </Switch>

              <Typography variant="body2" color="#194049" align="center" mt={4}>
                Powered by &nbsp; <MHLogoIcon style={{
                  width: '1rem',
                  display: 'inline',
                  verticalAlign: 'middle',
                }} />
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Box
              component="div"
              sx={{
                height: '100vh',
                overflow: 'hidden'
              }}>
              <img
                src={image.imageSrc}
                alt={image.imageAlt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default AuthNavigator;

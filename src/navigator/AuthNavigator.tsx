import React from 'react';
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  useLocation
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import SignIn from '../pages/Auth/SignIn';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetLinkSuccess from '../pages/Auth/ResetLinkSuccess';
import PasswordReset from '../pages/Auth/PasswordReset';
import ResetSuccess from '../pages/Auth/ResetSuccess';

import MHLogo from '../theme/icons/MHLogo';
import { ReactComponent as OrgLogo } from '../static/svg/unilever-logo.svg';
import { FnComponent } from '../models/component.model';
import { theme } from '../theme/mui/dashboard.theme';
import { BGImage } from '../models/background-image.model';

const AuthNavigator: FnComponent = () => {
  const [image, setImage] = React.useState<BGImage>({} as BGImage);
  const backgroundColor = React.useRef(theme.palette.background.default);

  const { path } = useRouteMatch();
  const location = useLocation();

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
      <Box sx={{ flexGrow: 1 }} bgcolor="#FAFAFA">
        <Grid container spacing={0} sx={{ minHeight: '100vh' }} justifyContent="center">
          <Grid
            item
            xs={6}
            sx={{
              // backgroundColor: backgroundColor.current,
              position: 'relative'
            }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: '100vh', px: 6 }}>
              <Box position="relative" top={-25}>
                {/* <MHLogoIcon /> */}
                {/* <OrgLogo /> */}
                <MHLogo style={{ width: '3.4rem' }} />
              </Box>
              <TransitionGroup style={{ width: '100%' }}>
                <CSSTransition
                  unmountOnExit
                  key={location.pathname}
                  classNames="fade"
                  timeout={400}>
                  <Switch location={location}>
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
                </CSSTransition>
              </TransitionGroup>

              <Typography variant="body2" color="#194049" align="center" mt={4}>
                Powered by &nbsp;{' '}
                <MHLogo
                  style={{
                    width: '2rem',
                    display: 'inline',
                    verticalAlign: 'middle'
                  }}
                />
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default AuthNavigator;

import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useLocation
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Startup from '../components/Dashboard/Startup';
import Interests from '../pages/Onboarding/Interests';
import Onboarding from '../pages/Onboarding/Onboarding';

import AuthContext from '../store/context/auth-context';
import { OnboardingContextProvider } from '../store/context/onboarding-context';
import { User } from '../models/user.model';

const OnboardingNavigator = () => {
  const authCtx = React.useContext(AuthContext);
  const { user, isOnboarded } = authCtx;
  
  const { path } = useRouteMatch();
  const location = useLocation();

  if (!authCtx.user) {
    // console.log('authCtx.user', authCtx.user);
    return <Startup />;
  }

  const userIsOnboarded = () => isOnboarded(user as User);

  // <Redirect
  //   to={{
  //     pathname: '/organization/dashboard',
  //     state: { from: { pathname: '/onboarding' } }
  //   }}
  // />;

  return (
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        key={location.pathname}
        classNames="fade"
        timeout={400}>
        <Switch location={location}>
          <Route path={`${path}/employee`}>
            <OnboardingContextProvider>
              <Onboarding isOnboarded={userIsOnboarded} />
            </OnboardingContextProvider>
          </Route>
          <Route path={`${path}/interests`}>
            <Interests />
          </Route>

          <Route path={`${path}`}>
            <Redirect to={`${path}/employee`} />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default OnboardingNavigator;

import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useLocation
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Layout from '../components/Layout/Layout';
import Startup from '../components/Dashboard/Startup';
import Dashboard from '../pages/Dashboard/Dashboard';
import UploadEmployees from '../pages/Dashboard/UploadEmployees';
import TeamMembers from '../pages/Dashboard/TeamMembers';
import Resources from '../pages/Dashboard/Resources';

import { DashboardContextProvider } from '../store/context/dashboard.context';
import AuthContext from '../store/context/auth-context';
import { User } from '../models/user.model';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(
  ({ theme }) => `
    padding: ${theme.spacing(3)};
  `
);

const DashboardNavigator = () => {
  const authCtx = React.useContext(AuthContext);

  const { path } = useRouteMatch();
  const location = useLocation();

  if (!authCtx.user) {
    return <Startup />;
  }

  if (!authCtx.isOnboarded(authCtx.user as User)) {
    return (
      <Redirect
        to={{
          pathname: '/onboarding/employee',
          state: { from: { pathname: '/dashboard' } }
        }}
      />
    );
  }

  return (
    <DashboardContextProvider>
      <Layout>
        <TransitionGroup>
          <CSSTransition
            unmountOnExit
            key={location.pathname}
            classNames="fade"
            timeout={400}>
            <Switch location={location}>
              <Route path={`${path}/dashboard`} exact>
                <Wrapper>
                  <Dashboard />
                </Wrapper>
              </Route>  
              
              <Route path={`${path}/upload-employees`} exact>
                <Wrapper>
                  <UploadEmployees />
                </Wrapper>
              </Route>  

              <Route path={`${path}/team-members`} exact>
                <Wrapper>
                  <TeamMembers />
                </Wrapper>
              </Route>  

              <Route path={`${path}/resources`} exact>
                <Wrapper>
                  <Resources />
                </Wrapper>
              </Route>  
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Layout>
    </DashboardContextProvider>
  );
};

export default DashboardNavigator;

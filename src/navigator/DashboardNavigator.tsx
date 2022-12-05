import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useLocation
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { styled } from '@mui/material/styles';
import Layout from '../components/Layout/Layout';
import Startup from '../components/Dashboard/Startup';
import Dashboard from '../pages/Dashboard/Dashboard';
import Employees from '../pages/Dashboard/Employees';
import Allocation from '../pages/Dashboard/Wallet';
import TeamMembers from '../pages/Dashboard/TeamMembers';
import Resources from '../pages/Dashboard/Resources';

import { DashboardContextProvider } from '../store/context/dashboard.context';
import AuthContext from '../store/context/auth-context';
import { User } from '../models/user.model';

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

  // if (!authCtx.isOnboarded(authCtx.user as User)) {
    // return (
    //   <Redirect
    //     to={{
    //       pathname: '/onboarding/employer',
    //       state: { from: { pathname: '/dashboard' } }
    //     }}
    //   />
    // );
  // }

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
              
              <Route path={`${path}/employees`} exact>
                <Wrapper>
                  <Employees />
                </Wrapper>
              </Route>  

              <Route path={`${path}/wallet`} exact>
                <Wrapper>
                  <Allocation />
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

import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useLocation
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../index.scss';

import Startup from '../components/Dashboard/Startup';
import Layout from '../components/Layout/Layout';
import Coaching from '../pages/Dashboard/Coaching';
import Dashboard from '../pages/Dashboard/Dashboard';
import Merchants from '../pages/Dashboard/Merchants';
import Wallet from '../pages/Dashboard/Wallet';
import ResourcesNavigator from './ResourcesNavigator';

import { DashboardContextProvider } from '../store/context/dashboard.context';
import AuthContext from '../store/context/auth-context';
import { User } from '../models/user.model';
import { styled } from '@mui/material/styles';
import Motherboard from '../components/Coaching/Motherboard';
import { WalletContextProvider } from '../store/context/wallet.context';

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
              <Route path={`${path}/wallet`} exact>
                <WalletContextProvider>
                  <Wrapper>
                    <Wallet title="Wallet" />
                  </Wrapper>
                </WalletContextProvider>
              </Route>
              <Route path={`${path}/merchants`} exact>
                <Wrapper>
                  <Merchants />
                </Wrapper>
              </Route>
              <Route path={`${path}/resources`}>
                <ResourcesNavigator />
              </Route>
              <Route path={`${path}/coaching`} exact>
                <Coaching />
              </Route>
              <Route path={`${path}/book-motherboard/:slug/:uuid`} exact>
                <Motherboard />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Layout>
    </DashboardContextProvider>
  );
};

export default DashboardNavigator;

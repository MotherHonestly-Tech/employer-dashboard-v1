import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Startup from '../components/Dashboard/Startup';

import Layout from '../components/Layout/Layout';
import Coaching from '../pages/Dashboard/Coaching';
import Dashboard from '../pages/Dashboard/Dashboard';
import Merchants from '../pages/Dashboard/Merchants';
import Resources from '../pages/Dashboard/Resources';
import Wallet from '../pages/Dashboard/Wallet';
import AuthContext from '../store/context/auth-context';

const DashboardNavigator = () => {
  const authCtx = React.useContext(AuthContext);
  const { path } = useRouteMatch();

  if (!authCtx.user) {
    console.log(authCtx.user)
    return <Startup />;
  }

  if (!authCtx.isOnboarded) {
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
    <React.Fragment>
      <Layout>
        <Switch>
          <Route path={`${path}/dashboard`} exact>
            <Dashboard />
          </Route>
          <Route path={`${path}/wallet`} exact>
            <Wallet />
          </Route>
          <Route path={`${path}/merchants`} exact>
            <Merchants />
          </Route>
          <Route path={`${path}/resources`} exact>
            <Resources />
          </Route>
          <Route path={`${path}/coaching`} exact>
            <Coaching />
          </Route>
        </Switch>
      </Layout>
    </React.Fragment>
  );
};

export default DashboardNavigator;

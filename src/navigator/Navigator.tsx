import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AuthNavigator from './AuthNavigator';
import DashboardNavigator from './DashboardNavigator';
import NotFound from '../pages/Error/404';

import AuthContext from "../store/context/auth-context";
import { FnComponent } from "../models/component.model";
import OnboardingNavigator from "./OnboardingNavigator";

const AppNavigator: FnComponent<{}> = (props) => {
  const authCtx = React.useContext(AuthContext);

  return (
    <React.Fragment>
      <Switch>
        <Route
          path="/"
          render={(routeProps) =>
            authCtx.isAuthenticated ? (
              <Redirect
                to={{
                  pathname: "/organization/dashboard",
                  state: { from: routeProps.location },
                }}
              />
            ) : (
              <Redirect
                to={{
                  pathname: "/auth/sign-in",
                  state: { from: routeProps.location },
                }}
              />
            )
          }
          exact
        />

        <Route path="/auth">
          <AuthNavigator />
        </Route>

        {/* <Route path={`/onboarding`} component={OnboardingNavigator} exact /> */}
        <Route path="/onboarding">
          {authCtx.isAuthenticated ? (
            <OnboardingNavigator />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>

        <Route path="/organization">
          {authCtx.isAuthenticated ? (
            <DashboardNavigator />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
        {/* <Route path="*">
          <Redirect to="/404" />
        </Route> */}
      </Switch>
    </React.Fragment>
  );
};

export default AppNavigator;

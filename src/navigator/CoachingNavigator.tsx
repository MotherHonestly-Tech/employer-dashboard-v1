import React from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Coaching from '../pages/Dashboard/Coaching';
import Motherboard from '../components/Coaching/Motherboard';
import BookingSummary from '../components/Coaching/BookingSummary';

const CoachingNavigator = () => {
  const { path } = useRouteMatch();
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        key={location.pathname}
        classNames="fade"
        timeout={400}>
        <Switch location={location}>
          <Route path={`${path}`} exact>
            <Coaching />
          </Route>
          <Route path={`${path}/booking/:slug/:uuid`} exact>
            <Motherboard />
          </Route>
          <Route path={`${path}/booking/summary`} exact>
            <BookingSummary />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default CoachingNavigator;

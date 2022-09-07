import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useLocation
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ArticlesPage from '../components/Resources/Articles/ArticlesPage';
import EventsPage from '../components/Resources/Events/EventsPage';
import PodcastsPage from '../components/Resources/Podcasts/PodcastsPage';
import ToolkitsPage from '../components/Resources/Toolkits/ToolkitsPage';
import ViewToolkit from '../components/Resources/Toolkits/ViewToolkit';
import VideosPage from '../components/Resources/Videos/VideosPage';

const ResourcesNavigator = () => {
  const { path } = useRouteMatch();
  const location = useLocation();

  console.log(path);

  return (
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        key={location.pathname}
        classNames="fade"
        timeout={400}>
        <Switch location={location}>
          <Route path={`${path}/resources/toolkits`} exact>
            <ToolkitsPage />
          </Route>
          <Route path={`${path}/resources/toolkits/:slug`} exact>
            <ViewToolkit />
          </Route>
          <Route path={`${path}/resources/videos`} exact>
            <VideosPage />
          </Route>
          <Route path={`${path}/resources/events`} exact>
            <EventsPage />
          </Route>
          <Route path={`${path}/resources/articles`} exact>
            <ArticlesPage />
          </Route>
          <Route path={`${path}/resources/podcasts`} exact>
            <PodcastsPage />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default ResourcesNavigator;

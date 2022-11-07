import React from "react";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Resources from "../pages/Dashboard/Resources";
import ArticlesPage from "../components/Resources/Articles/ArticlesPage";
import EventsPage from "../components/Resources/Events/EventsPage";
import PodcastsPage from "../components/Resources/Podcasts/PodcastsPage";
import ToolkitsPage from "../components/Resources/Toolkits/ToolkitsPage";
import ViewToolkit from "../components/Resources/Toolkits/ViewToolkit";
import VideosPage from "../components/Resources/Videos/VideosPage";
import ViewVideo from "../components/Resources/Videos/ViewVideo";
import ViewEvent from "../components/Resources/Events/ViewEvent";
import ViewArticle from "../components/Resources/Articles/ViewArticle";
import ViewPodcast from "../components/Resources/Podcasts/ViewPodcast";

const ResourcesNavigator = () => {
  const { path } = useRouteMatch();
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        key={location.pathname}
        classNames="fade"
        timeout={400}
      >
        <Switch location={location}>
          <Route path={`${path}`} exact>
            <Resources />
          </Route>
          <Route path={`${path}/toolkits`} exact>
            <ToolkitsPage />
          </Route>
          <Route path={`${path}/toolkits/:slug/:id`} exact>
            <ViewToolkit />
          </Route>
          <Route path={`${path}/videos`} exact>
            <VideosPage />
          </Route>
          <Route path={`${path}/videos/:slug/:id`} exact>
            <ViewVideo />
          </Route>
          <Route path={`${path}/events`} exact>
            <EventsPage />
          </Route>
          <Route path={`${path}/events/:slug/:id`} exact>
            <ViewEvent />
          </Route>
          <Route path={`${path}/articles`} exact>
            <ArticlesPage />
          </Route>
          <Route path={`${path}/articles/:slug/:id`} exact>
            <ViewArticle />
          </Route>
          <Route path={`${path}/podcasts`} exact>
            <PodcastsPage />
          </Route>
          <Route path={`${path}/podcasts/:slug/:id`} exact>
            <ViewPodcast />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default ResourcesNavigator;

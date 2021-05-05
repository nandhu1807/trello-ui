import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../shared/history';
import Loadable from 'react-loadable';
import MyLoadingComponent from '../../components/MyLoadingComponent';

const AsyncDashboard = Loadable({
  loader: () => import('../../containers/DashboardContainer'),
  loading: MyLoadingComponent,
});

export default props => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={AsyncDashboard} />
    </Switch>
  </Router>
);

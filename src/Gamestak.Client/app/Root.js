import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import './style.scss';

const Layout = lazy(() => import(/* webpackChunkName: "gs-layout" */ './Layout'));

// Pages
const ThemePage = lazy(() => import(/* webpackChunkName: "gs-theme" */ 'pages/Theme'));

export const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Switch>
              <Route path="/theme" component={ThemePage} />
              <Route render={() => <div>Not Found</div>} />
            </Switch>
          </Layout>
        </Suspense>
      </ConnectedRouter>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
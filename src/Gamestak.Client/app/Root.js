import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import SITEMAP from 'util/sitemap';
import Layout from './Layout';
import './style.scss';

// Pages
const ThemePage = lazy(() => import(/* webpackChunkName: "gs-theme" */ 'pages/Theme'));

export const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Switch>
              {
                Object.values(SITEMAP).map((page, index) => {
                  return (
                    <Route key={index} path={page.path} exact={page.exact} component={page.component || (() => <div>Placeholder</div>)} />
                  );
                })
              }
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
import React from 'react';
import { render } from 'react-dom';
import { createHashHistory } from 'history';
import { storeCreator } from 'util/storeCreator';
import sagas from './sagas';
import * as reducers from './reducers';
import { Root } from './Root';

const history = createHashHistory();

const reduxStore = storeCreator({
  initialState: {},
  reducers,
  sagas,
  history,
});

render(<Root store={reduxStore} history={history} />, document.getElementById('react-root'));
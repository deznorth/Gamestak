import { combineReducers } from 'redux';

import StoreReducer from './Store/modules/reducer';

export default combineReducers({
  store: StoreReducer,
});

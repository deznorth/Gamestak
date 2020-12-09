import { combineReducers } from 'redux';

import StoreReducer from './Store/modules/reducer';
import GameDetailReducer from './GameDetail/modules/reducer';

export default combineReducers({
  store: StoreReducer,
  detail: GameDetailReducer,
});

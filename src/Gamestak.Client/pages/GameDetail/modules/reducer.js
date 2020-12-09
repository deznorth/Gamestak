import { handleActions } from 'redux-actions';
import * as actions from './actions';

const INITIAL_STATE = {
  loadingGame: false,
};

export default handleActions({
  [actions.fetchingGame]: state => ({
    ...state,
    loadingGame: true,
  }),
  [actions.fetchedGame]: (state, { payload }) => ({
    ...state,
    ...payload,
    loadingGame: false,
  }),
}, INITIAL_STATE);
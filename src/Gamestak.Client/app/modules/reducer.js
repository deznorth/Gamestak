import { handleActions } from 'redux-actions';
import * as actions from './actions';

const INITIAL_STATE = {
  categories: [],
  features: [],
};

export default handleActions({
  [actions.fetchedCategories]: (state, { payload }) => ({
    ...state,
    categories: payload,
  }),
  [actions.fetchedFeatures]: (state, { payload }) => ({
    ...state,
    features: payload,
  }),
}, INITIAL_STATE);

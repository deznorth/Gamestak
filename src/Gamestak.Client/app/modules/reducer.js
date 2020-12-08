import { handleActions } from 'redux-actions';
import * as actions from './actions';

const INITIAL_STATE = {
  loadingFilters: false,
  categories: [],
  features: [],
};

export default handleActions({
  [actions.fetchingFilters]: state => ({
    ...state,
    loadingFilters: true,
  }),
  [actions.fetchedFilters]: (state, { payload }) => ({
    ...state,
    loadingFilters: false,
    categories: payload.categories,
    features: payload.features,
  }),
}, INITIAL_STATE);

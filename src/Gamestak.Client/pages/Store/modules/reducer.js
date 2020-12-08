import { handleActions } from 'redux-actions';
import * as actions from './actions';

const INITIAL_STATE = {
  games: [],
  featuredGames: [],
  searchParams: {
    searchTerm: '',
    sortBy: 0,
    categories: [],
    features: [],
  },
};

export default handleActions({
  [actions.fetchedFeatured]: (state, { payload }) => ({
    ...state,
    featuredGames: payload,
  }),
  [actions.fetchedGames]: (state, { payload }) => ({
    ...state,
    games: payload,
  }),
  [actions.updateSearchParams]: (state, { payload }) => ({
    ...state,
    searchParams: {
      ...state.searchParams,
      [payload.param]: payload.value,
    },
  }),
}, INITIAL_STATE);
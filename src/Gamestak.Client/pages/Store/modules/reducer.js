import { handleActions } from 'redux-actions';
import * as actions from './actions';

const INITIAL_STATE = {
  loadingGames: false,
  loadingFeatured: false,
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
  [actions.fetchingFeatured]: state => ({
    ...state,
    loadingFeatured: true,
  }),
  [actions.fetchedFeatured]: (state, { payload }) => ({
    ...state,
    loadingFeatured: false,
    featuredGames: payload,
  }),
  [actions.searchingGames]: state => ({
    ...state,
    loadingGames: true,
  }),
  [actions.searchedGames]: (state, { payload }) => ({
    ...state,
    loadingGames: false,
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
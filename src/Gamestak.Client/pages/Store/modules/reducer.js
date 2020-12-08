import { handleActions } from 'redux-actions';
import * as actions from './actions';

const INITIAL_STATE = {
  games: [],
  featuredGames: [],
  sortOptions: [],
  sortInfo: {
    by: 'releaseDate',
    order: 'asc',
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
}, INITIAL_STATE);
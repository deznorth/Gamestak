import { handleActions } from 'redux-actions';
import * as actions from './actions';

const INITIAL_STATE = {
  categories: [],
  features: [],
  games: [],
  featuredGames: [],
  sortOptions: [],
  sortInfo: {
    by: 'releaseDate',
    order: 'asc',
  },
};

export default handleActions({
  [actions.fetchedGames]: (state, { payload }) => ({
    ...state,
    games: payload,
  }),
}, INITIAL_STATE);
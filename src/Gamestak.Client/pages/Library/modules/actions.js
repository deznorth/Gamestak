import { createAction } from 'redux-actions';

const base = 'library/';
const makeAction = action => createAction(`${base}${action}`);

// Shared actions (used by sagas and reducers)
export const updateSearchParams = makeAction('UPDATED_SEARCH_PARAMS');

export const fetchingFeatured = makeAction('FETCHING_FEATURED');
export const searchingGames = makeAction('SEARCHING_GAMES');

export const fetchedFeatured = makeAction('FETCHED_FEATURED');
export const searchedGames = makeAction('SEARCHED_GAMES');

// Saga-only actions
export const initialize = makeAction('INITIALIZE');
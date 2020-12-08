import { createAction } from 'redux-actions';

const base = 'store/';
const makeAction = action => createAction(`${base}${action}`);

// Shared actions (used by sagas and reducers)
export const fetchedFeatured = makeAction('FETCHED_FEATURED');
export const fetchedGames = makeAction('FETCHED_GAMES');

// Saga-only actions
export const initialize = makeAction('INITIALIZE');
export const fetchingFeatured = makeAction('FETCHING_FEATURED');
export const fetchingGames = makeAction('FETCHING_GAMES');
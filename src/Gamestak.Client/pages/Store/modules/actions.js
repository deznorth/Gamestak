import { createAction } from 'redux-actions';

const base = 'store/';
const makeAction = action => createAction(`${base}${action}`);

// Shared actions (used by sagas and reducers)
export const fetchedGames = makeAction('FETCHED_GAMES');

// Saga-only actions
export const initialize = makeAction('INITIALIZE');
export const fetchingGames = makeAction('FETCHING_GAMES');
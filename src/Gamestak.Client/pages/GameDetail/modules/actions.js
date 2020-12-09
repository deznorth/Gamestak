import { createAction } from 'redux-actions';

const base = 'detail/';
const makeAction = action => createAction(`${base}${action}`);

// Shared actions (used by sagas and reducers)
export const fetchingGame = makeAction('FETCHING_GAME');
export const fetchedGame = makeAction('FETCHED_GAME');

// Saga-only actions
export const initialize = makeAction('INITIALIZE');
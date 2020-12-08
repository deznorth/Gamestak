import { createAction } from 'redux-actions';

const base = 'shared/';
const makeAction = action => createAction(`${base}${action}`);

// Shared actions (used by sagas and reducers)
export const fetchingFilters = makeAction('FETCHING_FILTERS');

export const fetchedFilters = makeAction('FETCHED_FILTERS');

// Saga-only actions
export const initialize = makeAction('INITIALIZE');

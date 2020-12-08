import { createAction } from 'redux-actions';

const base = 'shared/';
const makeAction = action => createAction(`${base}${action}`);

// Shared actions (used by sagas and reducers)
export const fetchedCategories = makeAction('FETCHED_CATEGORIES');
export const fetchedFeatures = makeAction('FETCHED_FEATURES');

// Saga-only actions
export const initialize = makeAction('INITIALIZE');
export const fetchingCategories = makeAction('FETCHING_CATEGORIES');
export const fetchingFeatures = makeAction('FETCHING_FEATURES');

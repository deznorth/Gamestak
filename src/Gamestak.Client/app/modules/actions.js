import { createAction } from 'redux-actions';

const base = 'shared/';
const makeAction = action => createAction(`${base}${action}`);

// Shared actions (used by sagas and reducers)
export const showModal = makeAction('SHOW_MODAL');
export const hideModal = makeAction('HIDE_MODAL');

export const loginAttempt = makeAction('LOGIN_ATTEMPT');
export const loginSuccess = makeAction('LOGIN_SUCCESS');
export const loginFailure = makeAction('LOGIN_FAILURE');

export const registerAttempt = makeAction('REGISTER_ATTEMPT');
export const registerSuccess = makeAction('REGISTER_SUCCESS');
export const registerFailure = makeAction('REGISTER_FAILURE');

export const fetchingFilters = makeAction('FETCHING_FILTERS');
export const fetchedFilters = makeAction('FETCHED_FILTERS');

// Saga-only actions
export const initialize = makeAction('INITIALIZE');

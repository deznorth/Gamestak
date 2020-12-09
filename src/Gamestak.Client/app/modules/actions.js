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

export const logout = makeAction('LOGOUT');

export const fetchingFilters = makeAction('FETCHING_FILTERS');
export const fetchedFilters = makeAction('FETCHED_FILTERS');

export const addToCart = makeAction('ADD_TO_CART');
export const removeFromCart = makeAction('REMOVE_FROM_CART');
export const clearCart = makeAction('CLEAR_CART');

export const checkoutAttempt = makeAction('CHECKOUT_ATTEMPT');
export const checkoutSuccess = makeAction('CHECKOUT_SUCCESS');
export const checkoutFailure = makeAction('CHECKOUT_FAILURE');

export const updateOwnedGames = makeAction('UPDATE_OWNED');

// Saga-only actions
export const initialize = makeAction('INITIALIZE');

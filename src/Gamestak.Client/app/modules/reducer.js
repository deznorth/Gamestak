import { handleActions } from 'redux-actions';
import * as actions from './actions';

const INITIAL_STATE = {
  loginAttempt: false,
  loginError: false,
  registerAttempt: false,
  registerError: false,
  loadingFilters: false,
  categories: [],
  features: [],
  currentUser: null,
  shownModal: '',
};

export default handleActions({
  [actions.fetchingFilters]: state => ({
    ...state,
    loadingFilters: true,
  }),
  [actions.fetchedFilters]: (state, { payload }) => ({
    ...state,
    loadingFilters: false,
    categories: payload.categories,
    features: payload.features,
  }),
  [actions.showModal]: (state, { payload }) => ({
    ...state,
    shownModal: payload,
  }),
  [actions.hideModal]: state => ({
    ...state,
    shownModal: '',
  }),
  [actions.loginAttempt]: state => ({
    ...state,
    loginAttempt: true,
  }),
  [actions.loginSuccess]: (state, { payload }) => ({
    ...state,
    loginAttempt: false,
    currentUser: payload,
  }),
  [actions.loginFailure]: state => ({
    ...state,
    loginAttempt: false,
    loginError: true,
  }),
  [actions.registerAttempt]: state => ({
    ...state,
    registerAttempt: true,
  }),
  [actions.registerSuccess]: state => ({
    ...state,
    registerSuccess: true,
    registerAttempt: false,
  }),
  [actions.registerFailure]: state => ({
    ...state,
    registerError: true,
  }),
}, INITIAL_STATE);

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
    loginError: false,
    loginAttempt: true,
  }),
  [actions.loginSuccess]: (state, { payload }) => ({
    ...state,
    shownModal: '',
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
    registerError: false,
    registerAttempt: true,
  }),
  [actions.registerSuccess]: state => ({
    ...state,
    shownModal: 'signin',
    registerSuccess: true,
    registerAttempt: false,
  }),
  [actions.registerFailure]: state => ({
    ...state,
    registerError: true,
  }),
  [actions.logout]: state => ({
    ...state,
    currentUser: null,
  }),
  [actions.initialize]: state => {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      return {
        ...state,
        currentUser: JSON.parse(currentUser),
      };
    }
    return {
      ...state,
    };
  },
}, INITIAL_STATE);

import { handleActions } from 'redux-actions';
import * as actions from './actions';

const INITIAL_STATE = {
  loginAttempt: false,
  loginError: false,
  registerAttempt: false,
  registerError: false,
  loadingFilters: false,
  checkoutAttempt: false,
  checkoutError: false,
  categories: [],
  features: [],
  currentUser: null,
  shownModal: '',
  shoppingCart: [],
};

export default handleActions({
  [actions.addToCart]: (state, { payload }) => {
    const currentUser = state.currentUser;
    const shoppingCart = state.shoppingCart;
    if (!shoppingCart.find(i => i.gameID === payload.gameID)) {
      shoppingCart.push(payload);
    }
    localStorage.setItem(`${currentUser?.userId}-cart`, JSON.stringify(shoppingCart));
    return {
      ...state,
      shoppingCart,
    };
  },
  [actions.removeFromCart]: (state, { payload }) => {
    const currentUser = state.currentUser;
    const shoppingCart = state.shoppingCart;
    const filtered = shoppingCart.filter(i => parseInt(i.gameID) != payload);
    localStorage.setItem(`${currentUser?.userId}-cart`, JSON.stringify(filtered));
    return {
      ...state,
      shoppingCart: filtered,
    };
  },
  [actions.clearCart]: state => {
    const currentUser = state.currentUser;
    localStorage.removeItem(`${currentUser?.userId}-cart`);
    return {
      ...state,
      shoppingCart: [],
    };
  },
  [actions.checkoutAttempt]: state => ({
    ...state,
    checkoutError: false,
    checkoutAttempt: true,
  }),
  [actions.checkoutSuccess]: state => ({
    ...state,
    checkoutError: false,
    checkoutAttempt: false,
  }),
  [actions.checkoutFailure]: state => ({
    ...state,
    checkoutAttempt: false,
    checkoutError: true,
  }),
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
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const shoppingCart = JSON.parse(localStorage.getItem(`${currentUser?.userId}-cart`)) || [];
    if (currentUser) {
      return {
        ...state,
        currentUser: currentUser,
        shoppingCart: shoppingCart,
      };
    }
    return {
      ...state,
    };
  },
}, INITIAL_STATE);

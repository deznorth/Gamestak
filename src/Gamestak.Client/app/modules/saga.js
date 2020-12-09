import { all, put, call, takeEvery } from "redux-saga/effects";
import debug from 'debug';
import Proxies from 'util/proxies';
import * as actions from './actions';

const log = debug('saga:shared');

function* attemptLogin({ payload: user }) {
  try {
    const currentUser = yield call(Proxies.login, user);
    log(`User ${user.username} logged in!`);
    localStorage.setItem('user', JSON.stringify(currentUser.data));
    yield put(actions.loginSuccess(currentUser.data));
  } catch (err) {
    yield put(actions.loginFailure());
    log('Error loging in', err);
  }
}

function* attemptRegister({ payload: user }) {
  try {
    yield call(Proxies.register, user);
    log(`User ${user.username} registered!`);
    yield put(actions.registerSuccess());
  } catch (err) {
    yield put(actions.registerFailure());
    log('Error loging in', err);
  }
}

function* logout() {
  localStorage.clear();
}

function* attemptCheckout({ payload }) {
  try {
    yield call(Proxies.checkoutGames, payload);
    log(`Checkedout cart!`);
    const ownedGames = yield call(Proxies.getOwnedGames, payload.userID);
    yield put(actions.updateOwnedGames(ownedGames.data));
    yield put(actions.clearCart());
    yield put(actions.checkoutSuccess());
    yield put(actions.hideModal());
  } catch (err) {
    yield put(actions.checkoutFailure());
    log('Error checking out cart', err);
  }
}

function* fetchFilters() {
  try {
    const [categories, features] = yield all([
      call(Proxies.getCategories),
      call(Proxies.getFeatures),
    ]);

    const result = {
      categories: categories.data,
      features: features.data,
    };

    log('fetched filters', result);
    yield put(actions.fetchedFilters(result));
  } catch(err) {
    log('Error fetching filters', err);
  }
}

function* initialize() {
  log('Initializing');
  yield all([
    put(actions.fetchingFilters()),
  ]);
}

export default [
  takeEvery(actions.logout, logout),
  takeEvery(actions.loginAttempt, attemptLogin),
  takeEvery(actions.registerAttempt, attemptRegister),
  takeEvery(actions.checkoutAttempt, attemptCheckout),
  takeEvery(actions.fetchingFilters, fetchFilters),
  takeEvery(actions.initialize, initialize),
];
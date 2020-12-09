import { all, put, call, takeEvery } from "redux-saga/effects";
import debug from 'debug';
import Proxies from 'util/proxies';
import * as actions from './actions';

const log = debug('saga:shared');

function* attemptLogin({ payload: user }) {
  try {
    const currentUser = yield call(Proxies.login, user);
    log(`User ${currentUser.data.Username} logged in!`);
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
  takeEvery(actions.loginAttempt, attemptLogin),
  takeEvery(actions.registerAttempt, attemptRegister),
  takeEvery(actions.fetchingFilters, fetchFilters),
  takeEvery(actions.initialize, initialize),
];
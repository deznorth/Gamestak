import { all, put, call, takeEvery } from "redux-saga/effects";
import debug from 'debug';
import Proxies from 'util/proxies';
import * as actions from './actions';

const log = debug('saga:shared');

function* fetchCategories() {
  try {
    const result = yield call(Proxies.getCategories);
    yield put(actions.fetchedCategories(result.data));
  } catch(err) {
    log('Error fetching categories', err);
  }
}

function* fetchFeatures() {
  try {
    const result = yield call(Proxies.getFeatures);
    yield put(actions.fetchedFeatures(result.data));
  } catch(err) {
    log('Error fetching features', err);
  }
}

function* initialize() {
  log('initialize!');
  yield all([
    put(actions.fetchingCategories()),
    put(actions.fetchingFeatures()),
  ]);
}

export default [
  takeEvery(actions.fetchingCategories, fetchCategories),
  takeEvery(actions.fetchingFeatures, fetchFeatures),
  takeEvery(actions.initialize, initialize),
];
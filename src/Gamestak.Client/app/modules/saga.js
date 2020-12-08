import { all, put, call, takeEvery } from "redux-saga/effects";
import debug from 'debug';
import Proxies from 'util/proxies';
import * as actions from './actions';

const log = debug('saga:shared');

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
  takeEvery(actions.fetchingFilters, fetchFilters),
  takeEvery(actions.initialize, initialize),
];
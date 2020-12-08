import { put, call, all, takeEvery, takeLatest } from "redux-saga/effects";
import debug from 'debug';
import Proxies from 'util/proxies';
import * as actions from './actions';

const log = debug('saga:store');

function* fetchFeatured() {
  try {
    const result = yield call(Proxies.getFeaturedGames);
    log('fetched featured games', result.data);
    yield put(actions.fetchedFeatured(result.data));
  } catch(err) {
    log('Error fetching featured games', err);
  }
}

function* fetchGames() {
  try {
    const result = yield call(Proxies.getGames);
    log('fetched games', result.data);
    yield put(actions.fetchedGames(result.data));
  } catch(err) {
    log('Error fetching games', err);
  }
}

function* initialize() {
  log('Initializing');
  yield all([
    put(actions.fetchingFeatured()),
    put(actions.fetchingGames()),
  ]);
}

export default [
  takeEvery(actions.fetchingFeatured, fetchFeatured),
  takeLatest(actions.fetchingGames, fetchGames),
  takeEvery(actions.initialize, initialize),
];
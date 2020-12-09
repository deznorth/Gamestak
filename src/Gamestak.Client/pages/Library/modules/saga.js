import { put, call, all, takeEvery, debounce } from "redux-saga/effects";
import debug from 'debug';
import Proxies from 'util/proxies';
import * as actions from './actions';

const log = debug('saga:library');

function* searchGames({ payload }) {
  try {
    log('searching games', payload);
    const result = yield call(Proxies.getGames, payload);
    log('searched games', result.data);
    yield put(actions.searchedGames(result.data));
  } catch(err) {
    log('Error searching games', err);
  }
}

function* fetchFeatured() {
  try {
    const result = yield call(Proxies.getFeaturedGames);
    log('fetched featured games', result.data);
    yield put(actions.fetchedFeatured(result.data));
  } catch(err) {
    log('Error fetching featured games', err);
  }
}

function* initialize() {
  log('Initializing');
  yield all([
    put(actions.fetchingFeatured()),
  ]);
}

export default [
  debounce(500, actions.searchingGames, searchGames),
  takeEvery(actions.fetchingFeatured, fetchFeatured),
  takeEvery(actions.initialize, initialize),
];
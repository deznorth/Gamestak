import { put, call, all, takeEvery, takeLatest } from "redux-saga/effects";
import debug from 'debug';
import Proxies from 'util/proxies';
import * as actions from './actions';

const log = debug('saga:store');

function* fetchGames() {
  try {
    const result = yield call(Proxies.getGames);
    yield put(actions.fetchedGames(result.data));
  } catch(err) {
    log('Error fetching games', err);
  }
}

function* initialize() {
  log('initialize!');
  yield all([
    put(actions.fetchingGames()),
  ]);
}

export default [
  takeLatest(actions.fetchingGames, fetchGames),
  takeEvery(actions.initialize, initialize),
];
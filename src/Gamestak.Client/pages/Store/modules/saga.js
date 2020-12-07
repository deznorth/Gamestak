import { takeEvery, put } from "redux-saga/effects";
import debug from 'debug';
import * as actions from './actions';
import * as proxies from './proxies';

const log = debug('saga:store');

function* fetchGames() {
  try {
    const result = yield proxies.getGames();
    yield put(actions.fetchedGames(result.data));
  } catch(err) {
    log('Error fetching games', err);
  }
}

function* initialize() {
  log('initialize!');
  yield put(actions.fetchingGames());
}

export default [
  takeEvery(actions.fetchingGames, fetchGames),
  takeEvery(actions.initialize, initialize),
];
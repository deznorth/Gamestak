import { put, call, all, takeEvery } from "redux-saga/effects";
import debug from 'debug';
import Proxies from 'util/proxies';
import * as actions from './actions';

const log = debug('saga:detail');

function* fetchGame({ payload: id }) {
  try {
    const result = yield call(Proxies.getGameByID, id);
    log('fetched game', result.data);
    yield put(actions.fetchedGame(result.data));
  } catch(err) {
    log('Error fetching game', err);
  }
}

function* initialize({ payload: id }) {
  log('Initializing');
  yield all([
    put(actions.fetchingGame(id)),
  ]);
}

export default [
  takeEvery(actions.fetchingGame, fetchGame),
  takeEvery(actions.initialize, initialize),
];
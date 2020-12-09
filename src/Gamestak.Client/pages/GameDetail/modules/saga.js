import { put, call, all, takeEvery, select } from "redux-saga/effects";
import debug from 'debug';
import Proxies from 'util/proxies';
import * as actions from './actions';
import selectors from './selectors';

const log = debug('saga:detail');

function* fetchGame({ payload: id }) {
  try {
    const game = yield call(Proxies.getGameByID, id);
    const user = yield select(selectors.selectCurrentUser);
    const isAuthenticated = !!user;
    const owned = isAuthenticated ? yield select(selectors.selectIsOwnedGame, id) : false;
    const gameKey = owned ? yield call(Proxies.getGameKey, user.userId, id) : null;

    const result = {
      ...game.data,
      gameKey: gameKey?.data,
    };

    log('fetched game', result);
    yield put(actions.fetchedGame(result));
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
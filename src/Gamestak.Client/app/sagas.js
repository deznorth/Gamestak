import { all } from 'redux-saga/effects';
import sharedSagas from './modules/saga';

export default function* rootSaga() {
  yield all([
    ...sharedSagas,
  ]);
}

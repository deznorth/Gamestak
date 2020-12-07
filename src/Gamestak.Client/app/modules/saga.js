import { takeEvery } from "redux-saga/effects";
import debug from 'debug';
import * as actions from './actions';

const log = debug('saga:shared');

function* initialize() {
  log('initialize!');
}

export default [
  takeEvery(actions.initialize, initialize),
];
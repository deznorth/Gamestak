import { takeLatest } from "redux-saga/effects";
import debug from 'debug';
import * as actions from './actions';

const log = debug('saga:shared');

function* initialize() {
  log('initialize!');
}

export default [
  takeLatest(actions.initialize, initialize),
];
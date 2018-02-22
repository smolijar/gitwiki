import { takeLatest, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import types from '../actions/types';
import actions from '../actions/actions';

export function* helloFetch() {
  const data = yield fetch('/api/v1/repo/tree/testing/master')
    .then(res => res.json());
  yield put(actions.hello.api.done(data));
}

export default function* () {
  yield all([
    takeLatest(types.hello.api.HELLO_API_FETCH, helloFetch),
  ]);
}

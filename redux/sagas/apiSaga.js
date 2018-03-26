import { takeLatest, put, all } from 'redux-saga/effects';
import { generate, endpoints } from '../../src/routes';
import fetchApi from '../../src/fetchApi';
import types from '../actions/types';
import actions from '../actions/actions';

export function* fetchTree(action) {
  const data = yield fetchApi(generate(endpoints.TREE)(action.data));
  yield put(actions.repo.setTree(data));
}

export function* fetchRefs(action) {
  const data = yield fetchApi(generate(endpoints.REFS)(action.data));
  yield put(actions.repo.setRefs(data));
}

export function* fetchUser(action) {
  const data = yield fetchApi(generate(endpoints.USER)(action.data));
  yield put(actions.user.setUser(data));
}

export default function* () {
  yield all([
    takeLatest(types.repo.FETCH_TREE, fetchTree),
    takeLatest(types.repo.FETCH_REFS, fetchRefs),
    takeLatest(types.user.FETCH_USER, fetchUser),
  ]);
}

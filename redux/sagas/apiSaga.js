import { takeLatest, put, all } from 'redux-saga/effects';
import { compile } from 'path-to-regexp';
import fetchApi from '../../common/fetchApi';
import types from '../actions/types';
import actions from '../actions/actions';
import { api } from '../../common/endpoints';


export function* fetchTree(action) {
  const data = yield fetchApi(compile(api.tree)(action.data));
  yield put(actions.repo.setTree(data));
}

export function* fetchRefs(action) {
  const data = yield fetchApi(compile(api.refs)(action.data));
  yield put(actions.repo.setRefs(data));
}

export function* fetchUser(action) {
  const data = yield fetchApi(compile(api.user)(action.data));
  yield put(actions.user.setUser(data));
}

export function* fetchList(action) {
  const data = yield fetchApi(compile(api.list)(action.data));
  yield put(actions.repo.setList(data));
}

export default function* () {
  yield all([
    takeLatest(types.repo.FETCH_TREE, fetchTree),
    takeLatest(types.repo.FETCH_REFS, fetchRefs),
    takeLatest(types.user.FETCH_USER, fetchUser),
    takeLatest(types.repo.FETCH_LIST, fetchList),
  ]);
}

import { takeLatest, put, all } from 'redux-saga/effects';
import { fetchApi, generateBrowsingLink, generateRefsLink } from '../../src/routes';
import types from '../actions/types';
import actions from '../actions/actions';

export function* fetchTree(action) {
  const data = yield fetchApi(generateBrowsingLink(action.data));
  yield put(actions.repo.setTree(data));
}

export function* fetchRefs(action) {
  const data = yield fetchApi(generateRefsLink(action.data));
  yield put(actions.repo.setRefs(data));
}

export default function* () {
  yield all([
    takeLatest(types.repo.FETCH_TREE, fetchTree),
    takeLatest(types.repo.FETCH_REFS, fetchRefs),
  ]);
}

import { takeLatest, put, all } from 'redux-saga/effects';
import { fetchApi, generateBrowsingLink } from '../../src/routes';
import types from '../actions/types';
import actions from '../actions/actions';

export function* fetchTree(action) {
  const data = yield fetchApi(generateBrowsingLink(action.data));
  yield put(actions.repo.setTree(data));
}

export default function* () {
  yield all([
    takeLatest(types.repo.FETCH_TREE, fetchTree),
  ]);
}

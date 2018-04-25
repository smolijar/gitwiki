import { takeLatest, put, all } from 'redux-saga/effects';
import { compile } from 'path-to-regexp';
import { values } from 'ramda';
import { getApi, postApi, putApi } from '../../common/fetchApi';
import types from '../actions/types';
import actions from '../actions/actions';
import { api } from '../../common/endpoints';

export function* fetchTree(action) {
  const data = yield getApi(compile(api.tree)(action.data));
  yield put(actions.repo.setTree(data));
}

export function* fetchRefs(action) {
  const data = yield getApi(compile(api.refs)(action.data));
  yield put(actions.repo.setRefs(data));
}

export function* fetchUser(action) {
  const data = yield getApi(compile(api.user)(action.data));
  yield put(actions.user.setUser(data));
}

export function* fetchIndex(action) {
  const data = yield getApi(compile(api.index)(action.data));
  yield put(actions.repo.setIndex(data));
}

export function* postGithubPersonalToken(action) {
  yield postApi(compile(api.authGithubPersonalToken)(action.data), action.data);
}

export function* postRevision(action) {
  const changes = values(action.data.revision.changes);
  const { message } = action.data.revision;
  yield putApi(compile(api.tree)(action.data.meta), JSON.stringify({ changes, message }));
}

export default function* () {
  yield all([
    takeLatest(types.repo.FETCH_TREE, fetchTree),
    takeLatest(types.repo.FETCH_REFS, fetchRefs),
    takeLatest(types.user.FETCH_USER, fetchUser),
    takeLatest(types.repo.FETCH_INDEX, fetchIndex),
    takeLatest(types.user.POST_GITHUB_PERSONAL_TOKEN, postGithubPersonalToken),
    takeLatest(types.revision.POST_REVISION, postRevision),
  ]);
}

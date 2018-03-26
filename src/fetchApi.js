import fetch from 'isomorphic-unfetch';
import { assocPath, concat, __, compose } from 'ramda';
import { isLoggedIn, getAccessToken } from '../client/auth';

export default async function fetchApi(link, params = {}) {
  const req = params.req || false;
  let uri = `/api/v1${link}`;
  if (req) {
    uri = `${req.protocol}://${req.get('host')}${uri}`;
  }
  const headers = { method: 'GET' };
  return new Promise((res) => {
    if (isLoggedIn()) {
      return getAccessToken()
        .then(compose(assocPath(['headers', 'Authorization'], __, headers), concat('token ')))
        .then(res);
    }
    return res(headers);
  })
    .then(heads => fetch(uri, heads))
    .then(res => res.text())
    .then(res => JSON.parse(res));
}

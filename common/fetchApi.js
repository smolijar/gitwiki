import fetch from 'isomorphic-unfetch';
import { assocPath, concat, __, compose } from 'ramda';
import { isLoggedIn, getAccessToken } from '../client/auth';

export default async function fetchApi(link, params = {}) {
  const req = params.req || false;
  let uri = link;
  let headers = { method: 'GET' };
  const authHeader = compose(assocPath(['headers', 'Authorization'], __, headers), concat('token '));
  if (req) {
    uri = `${req.protocol}://${req.get('host')}${uri}`;
    if (req.cookies.token) {
      headers = authHeader(req.cookies.token);
    }
  }
  return new Promise((res) => {
    if (isLoggedIn()) {
      return getAccessToken()
        .then(authHeader)
        .then(res);
    }
    return res(headers);
  })
    .then(heads => fetch(uri, heads))
    .then(res => res.text())
    .then(res => JSON.parse(res));
}

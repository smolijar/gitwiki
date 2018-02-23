

import fetch from 'isomorphic-fetch';

export const generateBrowsingLink = ({ name, ref, path }) => `/repo/tree/${[name, ref, path].filter(p => p !== '').join('/')}`;

export async function fetchApi(link, { req }) {
  let uri = `/api/v1${link}`;
  if (req) {
    uri = `${req.protocol}://${req.get('host')}${uri}`;
  }
  return fetch(uri, {
    method: 'GET',
  })
    .then(res => res.text())
    .then(res => JSON.parse(res));
}


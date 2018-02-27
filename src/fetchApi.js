import fetch from 'isomorphic-fetch';

export default async function fetchApi(link, params = {}) {
  const req = params.req || false;
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

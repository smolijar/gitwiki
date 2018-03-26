import { compose, all, identity } from 'ramda';

const STORAGE_KEY = 'github_access';

const store = (token) => { localStorage.setItem(STORAGE_KEY, token); return token; };
const retrieve = () => localStorage.getItem(STORAGE_KEY);

const isLoggedIn = () => typeof localStorage !== 'undefined' && retrieve();

const getAccessToken = () => new Promise((res) => {
  const token = retrieve();
  if (token) {
    res(token);
  } else {
    window.processToken = compose(res, store);
    window.open('/api/v1/auth/github');
  }
});

export { getAccessToken, isLoggedIn };

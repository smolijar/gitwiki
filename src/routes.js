export const generateBrowsingLink = ({ name, ref, path }) => `/repo/tree/${[name, ref, path].filter(p => p !== '').join('/')}`;
export const generateRefsLink = ({ name }) => `/repo/refs/${name}`;


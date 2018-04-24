import Router from 'next/router';

export default (page, query, as) => Router.push({ pathname: page, query }, as)
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Layout, Breadcrumb } from 'antd';
import { zip } from 'ramda';
import { compile } from 'path-to-regexp';
import { front } from '../common/endpoints';
import ReferencesContainer from '../containers/ReferencesContainer';


const getCrumbs = (repo) => {
  const prefixes = path => path.split('/').map((v, i) => path.split('/').slice(0, i + 1).join('/'));
  return zip(prefixes(repo.path), repo.path.split('/'))
    .map(([prefix, fragment]) => {
      const query = { ...repo, path: prefix };
      return (
        <Breadcrumb.Item key={fragment}>
          <Link href={{ pathname: '/repo/tree', query }} as={compile(front.tree)(query)}>
            <a>{fragment}</a>
          </Link>
        </Breadcrumb.Item>
      );
    });
};

export default class extends React.PureComponent {
  static propTypes = {
    repo: PropTypes.objectOf(PropTypes.string).isRequired,
  }
  render() {
    const { repo } = this.props;
    const query = { ...repo, path: '' };
    return (
      <Layout>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link href={{ pathname: '/repo' }} as={compile(front.index)()}>
              <a>repos</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={{ pathname: '/repo/tree', query }} as={compile(front.tree)(query)}>
              <a>{repo.name}</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <ReferencesContainer />
          </Breadcrumb.Item>
          {getCrumbs(repo)}
        </Breadcrumb>
      </Layout>
    );
  }
}

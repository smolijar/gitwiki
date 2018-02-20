import React from 'react'
import Link from 'next/link';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { generateBrowsingLink } from '../src/routes';
import _ from 'lodash';

const prefixes = (path) => path.split("/").map((v, i) => path.split("/").slice(0, i + 1).join("/"));

export default ({ repo }) => (
  <Layout>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item><Link href={generateBrowsingLink({...repo, path: ''})}><a>{repo.name} ※ {repo.ref}</a></Link></Breadcrumb.Item>
      {_.zip(prefixes(repo.path), repo.path.split("/"))
        .map(([prefix, fragment]) => <Breadcrumb.Item key={fragment}>
          <Link href={generateBrowsingLink({...repo, path:prefix})}>{fragment}</Link>
        </Breadcrumb.Item>)}
    </Breadcrumb>
  </Layout>
)
import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import Link from 'next/link';
import path from 'path';
import { Layout, Menu } from 'antd';
import Breadcrumb from '../../components/Breadcrumb';
import AppLayout from '../../components/Layout';
import { generateBrowsingLink } from '../../src/routes';

const {
  Content, Sider,
} = Layout;


export default class extends React.Component {
  static propTypes = {
    repo: PropTypes.objectOf(PropTypes.string).isRequired,
    tree: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    blob: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }
  static defaultProps = {
    blob: null,
  }

  static async getInitialProps({ req, query }) {
    let uri = `/api/v1/repo/tree/${query.name}/${query.ref}/${query.path}`;
    if (req) {
      uri = `${req.protocol}://${req.get('host')}${uri}`;
    }
    const res = await fetch(uri, {
      method: 'GET',
    });
    const response = await res.text();
    return { repo: { ...query }, ...JSON.parse(response) };
  }

  render() {
    return (
      <AppLayout>
        <Breadcrumb repo={this.props.repo} />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              {
                this.props.tree.map((item) => {
                  const withEntry = path.join(this.props.repo.path, item.name);
                  const entryRepo = { ...this.props.repo, path: withEntry };
                  return (
                    <Menu.Item key={item.name}>
                      <Link href={{ pathname: '/repo/tree', query: entryRepo }} as={generateBrowsingLink(entryRepo)}>
                        <a>{item.name}</a>
                      </Link>
                    </Menu.Item>
                  );
                })
              }
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {
              this.props.blob && (
                <pre>{this.props.blob.content}</pre>
              )
            }
          </Content>
        </Layout>
      </AppLayout>
    );
  }
}

import React from 'react'
import fetch from 'isomorphic-fetch';
import Link from 'next/link';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import AppLayout from '../components/Layout';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


export default class extends React.Component {
  static async getInitialProps({ req }) {
    let uri = `/api/v1/repo/${req.params.name}/${req.params.ref}/${req.params.path}`;
    if (req) {
      uri = `${req.protocol}://${req.get('host')}${uri}`;
    }
    console.log(uri);
    const res = await fetch(uri, {
      method: 'GET',
    });
    const response = await res.text();
    return { repo: { ...req.params }, ...JSON.parse(response) }
  }

  render() {
    const link = item => '/repo/' + [this.props.repo.name, this.props.repo.ref, this.props.repo.path, item.name].filter(p => p !== '').join('/');
    return (
      <AppLayout>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>{this.props.repo.name} ※ {this.props.repo.ref}</Breadcrumb.Item>
          {this.props.repo.path.split('/').map(fragment => <Breadcrumb.Item key={fragment}>{fragment}</Breadcrumb.Item>)}
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              {
                this.props.tree.map((item, i) => <Menu.Item key={i}><Link href={link(item)}><a>{item.name}</a></Link></Menu.Item>)
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
    )
  }
}
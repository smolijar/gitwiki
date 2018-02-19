import React from 'react'
import fetch from 'isomorphic-fetch';
import Link from 'next/link';
import Head from 'next/head';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
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
    return { repo: {...req.params}, ...JSON.parse(response) }
  }

  render() {
    console.log([this.props.repo.name, this.props.repo.ref, this.props.repo.path]);
    const link = item => '/repo/' + [this.props.repo.name, this.props.repo.ref, this.props.repo.path, item.name].filter(p => p !== '').join('/');
    return (
      <div>
        <Head>
          <link rel="stylesheet" type="text/css" href="/antd/antd.css" />
        </Head>
        <Layout>
    <Header className="header">
      <div className="logo" style={{
        float: 'left',
        width: '120px',
        height: '31px',
        background: 'rgba(255,255,255,.2)',
        margin: '16px 28px 16px 0',
      }}>GitWiki</div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>{this.props.repo.name} ※ {this.props.repo.ref}</Breadcrumb.Item>
        {this.props.repo.path.split('/').map(fragment => <Breadcrumb.Item>{fragment}</Breadcrumb.Item>)}
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
              this.props.tree.map((item,i) => <Menu.Item key={i}><Link href={link(item)}>{item.name}</Link></Menu.Item>)
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
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2016 Created by Ant UED
    </Footer>
  </Layout>
      </div>
    )
  }
}
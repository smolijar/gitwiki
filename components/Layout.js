import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


export default ({ children }) => (
  <Layout>
    <Head>
      <link rel="stylesheet" type="text/css" href="/antd/antd.css" />
    </Head>
    <Header className="header">
      <div className="logo">
        <Link href="/">
          <span>
            <strong>Git</strong><Icon type="fork" />Wiki
          </span>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      {children}
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      GitWiki ©2018
    </Footer>
    <style jsx global>{`
      div.logo {
        float: left;
        width: 150px;
        height: 31px;
        color: #bbb;
        font-size: 28px;
        font-weight: 200;
        cursor: pointer;
      }
    `}</style>
  </Layout>
)
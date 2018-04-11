import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { Layout, Menu, Icon } from 'antd';
import NProgress from 'nprogress';
import Router from 'next/router';
import WidgetContainer from '../containers/user/WidgetContainer';

const {
  Header, Content, Footer,
} = Layout;


Router.onRouteChangeStart = NProgress.start;
Router.onRouteChangeComplete = NProgress.done;
Router.onRouteChangeError = NProgress.done;

export default class extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    breadcrumb: PropTypes.node,
    sider: PropTypes.node,
  }
  static defaultProps = {
    children: [],
  }
  render() {
    return (
      <Layout className="main-frame">
        <Head>
          <link rel="stylesheet" type="text/css" href="/static/antd/antd.css" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress/nprogress.css" />
          <link rel="stylesheet" type="text/css" href="/static/file-icons-js/css/style.css" />
        </Head>
        <Header className="header">
          <div className="logo">
            <Link href="/">
              <img src="/static/logo.png" />
            </Link>
          </div>
          <Menu
            mode="horizontal"
            style={{ lineHeight: '63px' }}
          >
            <Menu.Item>
              <WidgetContainer />
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {this.props.breadcrumb}
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            {this.props.sider}
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          GitWiki ©2018
        </Footer>
        <style jsx global>{`
          .ant-layout-header {
            background-color: #fff !important;
            z-index: 1;
          }
          .main-frame::before {
            content: ' ';
            display: block;
            height: 0px;
            width: 100%;
            top: 63px;
            position: absolute;
            box-shadow: 0 0 12px 2px #bbb;
            z-index: 0;
          }
          .ant-layout-header .ant-menu {
            background-color: #fff;
          }
          div.logo {
            float: left;
            width: 150px;
            height: 31px;
            color: #bbb;
            font-size: 28px;
            font-weight: 200;
            cursor: pointer;
          }
          div.logo img {
            width: 150px;            
          }
        `}
        </style>
      </Layout>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import NProgress from 'nprogress';
import Router from 'next/router';
import WidgetContainer from '../containers/user/WidgetContainer';

const {
  Header, Content, Footer, Sider,
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
    breadcrumb: null,
    sider: null,
  }
  render() {
    const sider = this.props.sider && <Sider width={200} style={{ background: '#fff' }}>{this.props.sider}</Sider>;
    return (
      <Layout className="main-frame">
        <Head>
          <script src="/static/emily/script.js" />
          <link rel="stylesheet" type="text/css" href="/static/antd/antd.css" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress/nprogress.css" />
          <link rel="stylesheet" type="text/css" href="/static/file-icons-js/css/style.css" />
          <link rel="stylesheet" type="text/css" href="/static/emily/style.css" />
          <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/github.css" />
        </Head>
        <Header className="header">
          <div className="logo">
            <Link href="/">
              <img src="/static/logo.png" alt="logo" />
            </Link>
          </div>
          <Menu
            mode="horizontal"
            style={{ lineHeight: '63px' }}
          >
            <Menu.Item>
              <Link href="/repo">
                <a>Repositories</a>
              </Link>
            </Menu.Item>
          </Menu>
          <Menu
            mode="horizontal"
            style={{ lineHeight: '63px', float: 'right', marginTop: '-65px' }}
          >
            <Menu.Item>
              <WidgetContainer />
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {this.props.breadcrumb}
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            {sider}
            <Content style={{ padding: '0 24px', overflow: 'inherit', minHeight: 280 }}>
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
          div.logo:hover {
            opacity: 0.68;
          }
          div.logo img {
            width: 150px;            
          }
          body > div:first-child, body > div:first-child > div {
            height: 100%;
          }
          
          span.node {
            color: rgba(0, 0, 0, 0.65);
          }
          span.node.file:before, span.node.directory:before {
            font-family: "anticon" !important;
            color: rgba(0, 0, 0, 0.65);
            font-size: 15px;
          }
          span.node.file::before {
            content: "\\E664";
          }
          span.node.directory::before {
            content: "\\E662";
          }
        `}
        </style>
      </Layout>
    );
  }
}

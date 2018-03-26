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
  }
  static defaultProps = {
    children: [],
  }
  render() {
    return (
      <Layout>
        <Head>
          <link rel="stylesheet" type="text/css" href="/static/antd/antd.css" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress/nprogress.css" />
          <link rel="stylesheet" type="text/css" href="/static/file-icons-js/css/style.css" />
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
            <Menu.Item>
              <WidgetContainer />
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {this.props.children}
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
        `}
        </style>
      </Layout>
    );
  }
}

import React from 'react';
import { Layout, Button } from 'antd';
import { connect } from 'react-redux';
import AppLayout from '../../components/Layout';
import withRedux from '../../redux/withRedux';

const {
  Content,
} = Layout;

const Login = () => (
  <AppLayout>
    <Layout style={{ padding: '24px 0', background: '#fff' }}>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Button
          type="primary"
          icon="github"
          size="large"
          onClick={() => {
          window.processCode = (code) => { console.warn(code); };
          window.open('/api/v1/auth/github');
        }}
        >Log in via GitHub
        </Button>
      </Content>
    </Layout>
  </AppLayout>
);

export default withRedux()(connect(null, null)(Login));

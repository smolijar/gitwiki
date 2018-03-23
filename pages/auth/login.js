import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd';
import { connect } from 'react-redux';
import AppLayout from '../../components/Layout';
import withRedux from '../../redux/withRedux';
import actions from '../../redux/actions/actions';

const {
  Content,
} = Layout;


class Login extends React.PureComponent {
  static propTypes = {
    setToken: PropTypes.func.isRequired,
  }
  render() {
    return (
      <AppLayout>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Button
              type="primary"
              icon="github"
              size="large"
              onClick={() => {
                window.processToken = this.props.setToken;
                window.open('/api/v1/auth/github');
              }}
            >Log in via GitHub
            </Button>
          </Content>
        </Layout>
      </AppLayout>
    );
  }
}

export default withRedux()(connect(null, { setToken: actions.auth.setAccessToken })(Login));

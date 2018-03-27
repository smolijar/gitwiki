import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import AppLayout from '../../components/Layout';
import withRedux from '../../redux/withRedux';
import IndexContainer from '../../containers/repo/IndexContainer';

const {
  Content,
} = Layout;

class Index extends React.PureComponent {
  render() {
    return (
      <AppLayout>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <IndexContainer />
          </Content>
        </Layout>
      </AppLayout>
    );
  }
}

export default withRedux()(connect(null, null)(Index));

import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import AppLayout from '../../components/Layout';
import withRedux from '../../redux/withRedux';
import ListContainer from '../../containers/repo/ListContainer';

const {
  Content,
} = Layout;

class List extends React.PureComponent {
  render() {
    return (
      <AppLayout>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <ListContainer />
          </Content>
        </Layout>
      </AppLayout>
    );
  }
}

export default withRedux()(connect(state => ({ list: state.repo.list }), null)(List));

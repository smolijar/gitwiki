import React from 'react';
import { connect } from 'react-redux';
import { compile } from 'path-to-regexp';
import Breadcrumb from '../../components/Breadcrumb';
import Layout from '../../components/Layout';
import fetchApi from '../../common/fetchApi';
import withRedux from '../../redux/withRedux';
import actions from '../../redux/actions/actions';
import { api } from '../../common/endpoints';
import IndexList from '../../components/repo/index/List';
import SideMenuContainer from '../../containers/repo/SideMenuContainer';
import Blob from '../../components/repo/blob';
import { repoType } from '../../client/propTypes';


class Tree extends React.Component {
  static propTypes = {
    repo: repoType.isRequired,
  }

  static async getInitialProps({ req, query, store }) {
    store.dispatch(actions.repo.setRepo(query));
    const response = await fetchApi(compile(api.tree)(query), { req });
    store.dispatch(actions.repo.setTree(response));
  }

  getContent = () => (
    <Blob blob={this.props.repo.blob} />
  )

  render() {
    const left = <SideMenuContainer />;
    let main = <IndexList repo={this.props.repo} />;
    if (this.props.repo.blob) {
      main = this.getContent();
    }
    return (
      <Layout breadcrumb={<Breadcrumb repo={this.props.repo.meta} />} sider={left}>
        {main}
      </Layout>
    );
  }
}

export default withRedux()(connect(state => ({ repo: state.repo }), null)(Tree));

import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { dirname } from 'path';
import { connect } from 'react-redux';
import { compile } from 'path-to-regexp';
import Breadcrumb from '../../components/Breadcrumb';
import { Input, Button } from 'antd';
import Layout from '../../components/Layout';
import fetchApi from '../../common/fetchApi';
import withRedux from '../../redux/withRedux';
import actions from '../../redux/actions/actions';
import { api } from '../../common/endpoints';
import IndexList from '../../components/repo/index/List';
import SideMenuContainer from '../../containers/repo/SideMenuContainer';
import Blob from '../../components/repo/blob';

class Edit extends React.Component {
  static propTypes = {
    repo: PropTypes.shape({
      meta: PropTypes.objectOf(PropTypes.string).isRequired,
      tree: PropTypes.arrayOf(PropTypes.object).isRequired,
      blob: PropTypes.object,
    }).isRequired,
  }

  static async getInitialProps({ req, query, store }) {
    store.dispatch(actions.repo.setRepo(query));
    const response = await fetchApi(compile(api.tree)(query), { req });
    store.dispatch(actions.repo.setTree(response));
  }

  getContent = () => (
    <Blob blob={this.props.repo.blob} />
  )

  getPrefix = () => dirname(this.props.repo.meta.path) + '/'

  render() {
    let left = <SideMenuContainer />;
    const defaultPath = this.props.repo.blob ? this.props.repo.blob.name : '';
    const defaultContent = this.props.repo.blob ? this.props.repo.blob.content : '';
    return (
      <Layout breadcrumb={<Breadcrumb repo={this.props.repo.meta} />} sider={left}>
        <Input defaultValue={defaultPath} addonBefore={this.getPrefix()} ref={el => { this.pathInput = el }} placeholder="Enter file name" />
        <textarea ref={el => { this.contentInput = el }}>
          {defaultContent}
        </textarea>
        <Button type="primary" onClick={() => {
          const path = this.getPrefix() + this.pathInput.input.value;
          const content = this.contentInput.value;
          this.props.setChange({ path, content });
          Router.back();
        }}>Add change</Button>
        <Button onClick={Router.back}>Cancel</Button>
      </Layout>
    );
  }
}

export default withRedux()(connect(state => ({ repo: state.repo }), { setChange: actions.revision.setChange })(Edit));

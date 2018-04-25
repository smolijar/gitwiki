import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { dirname } from 'path';
import { connect } from 'react-redux';
import { compile } from 'path-to-regexp';
import { Input, Button } from 'antd';
import Breadcrumb from '../../components/Breadcrumb';
import Layout from '../../components/Layout';
import { getApi } from '../../common/fetchApi';
import withRedux from '../../redux/withRedux';
import actions from '../../redux/actions/actions';
import { api } from '../../common/endpoints';
import SideMenuContainer from '../../containers/repo/SideMenuContainer';
import Blob from '../../components/repo/blob';
import { repoType } from '../../client/propTypes';


class Edit extends React.Component {
  static propTypes = {
    repo: repoType.isRequired,
    setChange: PropTypes.func.isRequired,
  }

  static async getInitialProps({ req, query, store }) {
    store.dispatch(actions.repo.setRepo(query));
    const response = await getApi(compile(api.tree)(query), { req });
    store.dispatch(actions.repo.setTree(response));
  }

  getContent = () => (
    <Blob blob={this.props.repo.blob} />
  )

  getPrefix = () => `${dirname(this.props.repo.meta.path)}/`

  render() {
    const left = <SideMenuContainer />;
    const defaultPath = this.props.repo.blob ? this.props.repo.blob.name : '';
    const defaultContent = this.props.repo.blob ? this.props.repo.blob.content : '';
    return (
      <Layout breadcrumb={<Breadcrumb repo={this.props.repo.meta} />} sider={left}>
        <Input defaultValue={defaultPath} addonBefore={this.getPrefix()} ref={(el) => { this.pathInput = el; }} placeholder="Enter file name" />
        <textarea ref={(el) => { this.contentInput = el; }}>
          {defaultContent}
        </textarea>
        <Button
          type="primary"
          onClick={() => {
          const path = this.getPrefix() + this.pathInput.input.value;
          const content = this.contentInput.value;
          this.props.setChange({ path, content });
          Router.back();
        }}
        >Add change
        </Button>
        <Button onClick={Router.back}>Cancel</Button>
      </Layout>
    );
  }
}

export default withRedux()(connect(
  state => ({ repo: state.repo }),
  { setChange: actions.revision.setChange },
)(Edit));

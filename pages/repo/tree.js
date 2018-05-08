import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compile } from 'path-to-regexp';
import { Button } from 'antd';
import Breadcrumb from '../../components/Breadcrumb';
import Layout from '../../components/Layout';
import { getApi } from '../../common/fetchApi';
import withRedux from '../../redux/withRedux';
import actions from '../../redux/actions/actions';
import { api, front } from '../../common/endpoints';
import redirect from '../../common/redirect';
import IndexList from '../../components/repo/index/List';
import SideMenuContainer from '../../containers/repo/SideMenuContainer';
import Blob from '../../components/repo/blob';
import { repoType } from '../../client/propTypes';


class Tree extends React.Component {
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

  render() {
    const left = <SideMenuContainer />;
    let main = <IndexList repo={this.props.repo} />;
    if (this.props.repo.blob) {
      main = this.getContent();
    }
    const { blob } = this.props.repo;
    const toolbar = (
      <div>
        <div className="toolbar">
          <Button
            onClick={() => redirect('/repo/edit', this.props.repo.meta, compile(front.edit)(this.props.repo.meta))}
            type="primary"
            shape="circle"
            icon={blob ? 'edit' : 'plus'}
            size="large"
          />
          {blob && <Button
            onClick={() => this.props.setChange({ path: blob.path, remove: true })}
            type="danger"
            shape="circle"
            icon="delete"
            size="large"
          />}
        </div>
        <style jsx global>{`
          .toolbar {
            position: absolute;
            right: 70px;
            top: 140px;
            z-index: 10;
          }
          .toolbar button {
            margin: 5px;
          }
        `}
        </style>
      </div>
    );
    return (
      <Layout breadcrumb={<Breadcrumb repo={this.props.repo.meta} />} sider={left}>
        {toolbar}
        {main}
      </Layout>
    );
  }
}

export default withRedux()(connect(
  state => ({ repo: state.repo }),
  { setChange: actions.revision.setChange },
)(Tree));

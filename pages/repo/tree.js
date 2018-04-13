import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compile } from 'path-to-regexp';
import Breadcrumb from '../../components/Breadcrumb';
import Layout from '../../components/Layout';
import fetchApi from '../../common/fetchApi';
import withRedux from '../../redux/withRedux';
import actions from '../../redux/actions/actions';
import { api } from '../../common/endpoints';
import IndexList from '../../components/repo/index/List';
import IndexMenu from '../../components/repo/index/Menu';
import Blob from '../../components/repo/blob';

class Tree extends React.Component {
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

  render() {
    let left = null;
    let main = <IndexList repo={this.props.repo} />;
    if (this.props.repo.blob) {
      left = <IndexMenu repo={this.props.repo} />;
      main = this.getContent();
    }
    return (
      <Layout breadcrumb={<Breadcrumb repo={this.props.repo.meta} />} sider={left}>
        {main}
        <style jsx global>{`
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

export default withRedux()(connect(state => ({ repo: state.repo }), null)(Tree));

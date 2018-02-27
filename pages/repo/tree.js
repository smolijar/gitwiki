import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import icons from 'file-icons-js';
import Breadcrumb from '../../components/Breadcrumb';
import AppLayout from '../../components/Layout';
import { endpoints, generate } from '../../src/routes';
import fetchApi from '../../src/fetchApi';
import withRedux from '../../redux/withRedux';
import actions from '../../redux/actions/actions';

const {
  Content, Sider,
} = Layout;

const getIconClass = (entry) => {
  if (entry.isDirectory) return 'directory';
  return icons.getClassWithColor(entry.name) || 'file';
};

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
    const response = await fetchApi(generate(endpoints.TREE)(query), { req });
    store.dispatch(actions.repo.setTree(response));
  }

  render() {
    return (
      <AppLayout>
        <Breadcrumb repo={this.props.repo.meta} />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              {
                this.props.repo.tree.map((item) => {
                  const entryRepo = { ...this.props.repo.meta, path: item.path };
                  return (
                    <Menu.Item key={item.name}>
                      <Link href={{ pathname: '/repo/tree', query: entryRepo }} as={generate(endpoints.TREE)(entryRepo)}>
                        <a><span className={`${getIconClass(item)} node`}> {item.name}</span></a>
                      </Link>
                    </Menu.Item>
                  );
                })
              }
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {
              this.props.repo.blob && (
                <pre>{this.props.repo.blob.content}</pre>
              )
            }
          </Content>
        </Layout>
        <style jsx global>{`
        span.node {
          color: rgba(0, 0, 0, 0.65);
        }
        span.node.file:before, span.node.directory:before {
          color: red;
          font-family: "anticon" !important;
          color: rgba(0, 0, 0, 0.65);
        }
        span.node.file::before {
          content: "\\E664";
        }
        span.node.directory::before {
          content: "\\E662";
        }
        `}
        </style>
      </AppLayout>
    );
  }
}

export default withRedux()(connect(state => ({ repo: state.repo }), null)(Tree));

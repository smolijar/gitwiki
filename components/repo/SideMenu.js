import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Icon, Badge, Modal } from 'antd';
import { values } from 'ramda';
import { compile } from 'path-to-regexp';
import getIconClass from './index/icon';
import { front } from '../../common/endpoints';
import redirect from '../../common/redirect';

const { SubMenu } = Menu;

export default class SideMenu extends React.PureComponent {
  static propTypes = {
    repo: PropTypes.shape({
      meta: PropTypes.objectOf(PropTypes.string).isRequired,
      tree: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    setChange: PropTypes.func.isRequired,
    postRevision: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      show: false
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.props.postRevision(this.props.repo);
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const blob = this.props.repo.blob;
    const changes = values(this.props.repo.revision.changes).length;
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{changes} files changed</p>
        </Modal>
        <Menu
          mode="inline"
          defaultOpenKeys={['index']}
          defaultSelectedKeys={[this.props.repo.meta.path]}
        >
          <Menu.Item key="__commit">
            <a onClick={this.showModal}>
              <Icon type="plus-circle-o" />Revision <Badge status={changes === 0 ? 'success' : 'warning'} />
            </a>
          </Menu.Item>
          <Menu.Item key="__edit">
            <a onClick={() => redirect('/repo/edit', this.props.repo.meta, compile(front.edit)(this.props.repo.meta))}>
              <Icon type="edit" />{blob ? 'Edit' : 'Create'} file
          </a>
          </Menu.Item>
          {blob &&
            <Menu.Item key="__delete">
              <a onClick={() => this.props.setChange({ path: blob.path, remove: true })}>
                <Icon type="close" />Delete file
            </a>
            </Menu.Item>
          }
          <SubMenu
            key="index"
            title={<span><Icon type="inbox" /><span>Index</span></span>}
          >
            {
              this.props.repo.tree.map((item) => {
                const entryRepo = { ...this.props.repo.meta, path: item.path };
                return (
                  <Menu.Item key={item.path}>
                    <Link href={{ pathname: '/repo/tree', query: entryRepo }} as={compile(front.tree)(entryRepo)}>
                      <a><span className={`${getIconClass(item)} node`}> {item.name}</span></a>
                    </Link>
                  </Menu.Item>
                );
              })
            }
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

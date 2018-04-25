import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Icon } from 'antd';
import { compile } from 'path-to-regexp';
import getIconClass from './index/icon';
import { front } from '../../common/endpoints';
import redirect from '../../common/redirect';
import ModalContainer from '../../containers/repo/revision/ModalContainer';
import { repoType } from '../../client/propTypes';

const { SubMenu } = Menu;

export default class SideMenu extends React.PureComponent {
  static propTypes = {
    repo: repoType.isRequired,
    setChange: PropTypes.func.isRequired,
  }

  render() {
    const { blob } = this.props.repo;
    return (
      <div>
        <Menu
          mode="inline"
          defaultOpenKeys={['index']}
          defaultSelectedKeys={[this.props.repo.meta.path]}
        >
          <Menu.Item key="__commit">
            <ModalContainer />
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

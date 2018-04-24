import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Icon } from 'antd';
import { compile } from 'path-to-regexp';
import getIconClass from './index/icon';
import { front } from '../../common/endpoints';

const { SubMenu } = Menu;

export default class SideMenu extends React.PureComponent {
  static propTypes = {
    repo: PropTypes.shape({
      meta: PropTypes.objectOf(PropTypes.string).isRequired,
      tree: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    setChange: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Menu
        mode="inline"
        defaultOpenKeys={['index']}
        defaultSelectedKeys={[this.props.repo.meta.path]}
      >
        <SubMenu
          key="commit"
          title={<span><Icon type="plus-circle-o" /><span>Commit</span></span>}
        ></SubMenu>
        <SubMenu
          key="actions"
          title={<span><Icon type="edit" /><span>Modify</span></span>}
        >
          <Menu.Item key="action-create">
            <a onClick={() => this.props.setChange({path: 'foo'})}>Create file</a>
          </Menu.Item>
          <Menu.Item key="action-edit">
            <a>Edit file</a>
          </Menu.Item>
          <Menu.Item key="action-delete">
            <a>Delete file</a>
          </Menu.Item>
        </SubMenu>
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
    );
  }
}

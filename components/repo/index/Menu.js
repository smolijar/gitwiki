import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from 'antd';
import { compile } from 'path-to-regexp';
import getIconClass from './icon';
import { front } from '../../../common/endpoints';

export default class IndexMenu extends React.PureComponent {
  static propTypes = {
    repo: PropTypes.shape({
      meta: PropTypes.objectOf(PropTypes.string).isRequired,
      tree: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }

  render() {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={[this.props.repo.meta.path]}
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
      </Menu>
    );
  }
}

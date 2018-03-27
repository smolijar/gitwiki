import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Dropdown } from 'antd';
import { compile } from 'path-to-regexp';
import { front } from '../common/endpoints';

export default class References extends React.PureComponent {
  static propTypes = {
    refs: PropTypes.arrayOf(PropTypes.object).isRequired,
    repo: PropTypes.objectOf(PropTypes.string).isRequired,
    fetchRefs: PropTypes.func.isRequired,
    fetchList: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchRefs(this.props.repo);
    this.props.fetchList();
  }

  render() {
    const menu = (
      <Menu>
        {
          this.props.refs
            .map((ref) => {
              const query = { ...this.props.repo, ref: ref.name };
              return (
                <Menu.Item disabled={ref.name === this.props.repo.ref} key={ref.name}>
                  <Link href={{ pathname: '/repo/tree', query }} as={compile(front.tree)(query)}>
                    <span>{ref.name}</span>
                  </Link>
                </Menu.Item>
              );
            })
        }
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link">
          {this.props.repo.ref}
        </a>
      </Dropdown>
    );
  }
}

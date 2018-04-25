import React from 'react';
import Link from 'next/link';
import { List } from 'antd';
import { compile } from 'path-to-regexp';
import getIconClass from './icon';
import { front } from '../../../common/endpoints';
import { repoType } from '../../../client/propTypes';

export default class IndexList extends React.PureComponent {
  static propTypes = {
    repo: repoType.isRequired,
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.repo.tree}
        renderItem={(item) => {
          const entryRepo = { ...this.props.repo.meta, path: item.path };
          return (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link href={{ pathname: '/repo/tree', query: entryRepo }} as={compile(front.tree)(entryRepo)}>
                    <a><span className={`${getIconClass(item)} node`} /> {item.name}</a>
                  </Link>
                }
              />
              <div>{item.sha}</div>
            </List.Item>
          );
        }}
      />
    );
  }
}

import React from 'react';
import Link from 'next/link';
import { Menu, Badge } from 'antd';
import { values } from 'ramda';
import { compile } from 'path-to-regexp';
import getIconClass from './index/icon';
import { front } from '../../common/endpoints';
import ModalContainer from '../../containers/repo/revision/ModalContainer';
import { repoType } from '../../client/propTypes';

export default class SideMenu extends React.PureComponent {
  static propTypes = {
    repo: repoType.isRequired,
  }

  renderList = () => {
    const data = values(this.props.repo.revision.changes);
    if (data.length === 0) {
      return (<div />);
    }
    return (
      <div className="badges">
        {data.map((change) => {
            let status = 'default';
            let msg = 'change';
            if (change.remove === true) {
              status = 'error';
              msg = 'delete';
            }
            return (
              <div>
                <Badge status={status} text={`${change.path} (${msg})`} /> <br />
              </div>
            );
          })
        }
        <ModalContainer />
        <style jsx>{`
          .badges {
            padding: 0 15px
          }
        `}
        </style>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h3>Pending commit</h3>
        {this.renderList()}
        <h3>Current folder</h3>
        <Menu
          mode="inline"
          defaultOpenKeys={['index']}
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
        <style jsx>{`
          h3 {
            margin-left: 10px;
          }
        `}
        </style>
      </div>
    );
  }
}

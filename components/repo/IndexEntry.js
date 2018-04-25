import React from 'react';
import Link from 'next/link';
import { Card, Avatar } from 'antd';
import { unless, equals, always } from 'ramda';
import { compile } from 'path-to-regexp';
import { front } from '../../common/endpoints';
import { repoIndexEntryType } from '../../client/propTypes';

const icon = unless(equals('github'), always('fork'));

export default class IndexEntry extends React.PureComponent {
  static propTypes = {
    entry: repoIndexEntryType.isRequired,
  }

  render() {
    const { entry } = this.props;
    const params = { ref: 'master', path: '', ...entry };
    return (
      <div>
        <Link href={{ pathname: '/repo/tree', query: params }} as={compile(front.tree)(params)}>
          <Card
            style={{ height: 90 }}
          >
            <Card.Meta
              avatar={<Avatar icon={icon(entry.provider)} />}
              title={entry.name}
              description={entry.description}
              className="repo-entry"
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            />
          </Card>
        </Link>
        <style jsx global>{`
        .repo-entry .ant-card-meta-description {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      `}
        </style>
      </div>
    );
  }
}

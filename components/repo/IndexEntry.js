import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar } from 'antd';
const entryType = PropTypes.shape({
  name: PropTypes.string,
});

export { entryType };

export default class IndexEntry extends React.PureComponent {
  static propTypes = {
    entry: entryType.isRequired,
  }

  render() {
    const { entry } = this.props;
    return (<div>
      <Card
        style={{ height: 90 }}
      >
        <Card.Meta
          avatar={<Avatar icon="github" />}
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
      <style jsx global>{`
        .repo-entry .ant-card-meta-description {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      `}</style>
    </div>);
  }
}

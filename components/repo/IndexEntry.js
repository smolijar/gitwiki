import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { slice, compose, concat, flip, identity, ifElse } from 'ramda';
const entryType = PropTypes.shape({
  name: PropTypes.string,
});

export { entryType };

export default class IndexEntry extends React.PureComponent {
  static propTypes = {
    entry: entryType.isRequired,
  }

  render() {
    const trunc = ifElse(
      identity,
      compose(flip(concat)('...'), slice(0,80)),
      identity
    )
    const { entry } = this.props;
    return (<div>
      <Card className="repo-entry" title={entry.name}>{trunc(entry.description)}</Card>
      <style jsx global>{`
      .repo-entry .ant-card-body { height: 100px }
      `}</style>
    </div>);
  }
}

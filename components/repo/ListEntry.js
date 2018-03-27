import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const entryType = PropTypes.shape({
  name: PropTypes.string,
});

export { entryType };

export default class ListEntry extends React.PureComponent {
  static propTypes = {
    entry: entryType.isRequired,
  }

  render() {
    const { entry } = this.props;
    return <Card title={entry.name} bordered={false}>{entry.description}</Card>;
  }
}

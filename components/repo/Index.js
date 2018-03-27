import React from 'react';
import PropTypes from 'prop-types';
import IndexEntry, { entryType } from './IndexEntry';


export default class Index extends React.PureComponent {
  static propTypes = {
    fetchIndex: PropTypes.func.isRequired,
    index: PropTypes.arrayOf(entryType).isRequired,
  }
  componentDidMount() {
    this.props.fetchIndex();
  }

  render() {
    return this.props.index.map(item => <IndexEntry key={item.name} entry={item} />);
  }
}

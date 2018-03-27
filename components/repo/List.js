import React from 'react';
import PropTypes from 'prop-types';
import ListEntry, { entryType } from './ListEntry';


export default class List extends React.PureComponent {
  static propTypes = {
    fetchIndex: PropTypes.func.isRequired,
    index: PropTypes.arrayOf(entryType).isRequired,
  }
  componentDidMount() {
    this.props.fetchIndex();
  }

  render() {
    return this.props.index.map(item => <ListEntry key={item.name} entry={item} />);
  }
}

import React from 'react';
import PropTypes from 'prop-types';

export default class List extends React.PureComponent {
  static propTypes = {
    fetchIndex: PropTypes.func.isRequired,
    index: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })).isRequired,
  }
  componentDidMount() {
    this.props.fetchIndex();
  }

  render() {
    return this.props.index.map(item => <h1 key={item.name}>{item.name}</h1>);
  }
}

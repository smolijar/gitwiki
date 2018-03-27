import React from 'react';
import PropTypes from 'prop-types';

export default class List extends React.PureComponent {
  static propTypes = {
    fetchList: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  }
  static defaultProps = {
    list: [],
  }

  componentDidMount() {
    this.props.fetchList();
  }

  render() {
    return this.props.list.map(item => <h1 key={item.name}>{item.name}</h1>);
  }
}

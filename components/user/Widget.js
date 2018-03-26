import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

export default class Widget extends React.PureComponent {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    user: PropTypes.shape({
      avatar_url: PropTypes.string,
    }).isRequired,
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Avatar size="large" src={this.props.user.avatar_url} />
    );
  }
}

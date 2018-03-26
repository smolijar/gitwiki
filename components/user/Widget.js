import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from 'antd';
import { getAccessToken, isLoggedIn } from '../../client/auth';

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
    if (isLoggedIn()) {
      return (
        <Avatar size="large" src={this.props.user.avatar_url} />
      );
    }
    return (
      <Button
        type="primary"
        icon="github"
        onClick={getAccessToken}
      >Log in
      </Button>
    );
  }
}

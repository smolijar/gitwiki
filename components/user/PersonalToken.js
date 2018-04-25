import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import { isLoggedIn } from '../../client/auth';
import { userType } from '../../client/propTypes';


export default class PersonalToken extends React.PureComponent {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    postToken: PropTypes.func.isRequired,
    user: userType.isRequired,
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  handleSubmit = () => {
    const token = this.input.input.value;
    this.props.postToken(JSON.stringify({ personalToken: token }));
  }

  renderInput = () => {
    if (isLoggedIn() && this.props.user.githubPersonalAccessTokenSet === false) {
      return (
        <div>
          <p>
            If you want to use your repositories from GitHub,
            you must create a Personal Access Token.
          See <a href="https://blog.github.com/2013-05-16-personal-api-tokens/" rel="noopener noreferrer" target="_blank">Personal API tokens</a>.
          </p>

          <Input ref={(el) => { this.input = el; }} placeholder="GitHub personal access token" style={{ width: 400 }} />
          <Button onClick={this.handleSubmit} type="primary">Submit</Button>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.renderInput()}
      </div>
    );
  }
}

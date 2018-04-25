import React from 'react';
import { accessTokenType } from '../../../client/propTypes';


class Callback extends React.Component {
  static async getInitialProps({ query }) {
    return { accessToken: query.accessToken };
  }
  static propTypes = {
    accessToken: accessTokenType.isRequired,
  }
  componentDidMount() {
    window.opener.processToken(this.props.accessToken);
    // eslint-disable-next-line no-restricted-globals
    close();
  }
  render() {
    const msg = this.props.accessToken ? 'Authentication successful' : 'Missing `accessToken` in query';
    return (<span>{msg}</span>);
  }
}

export default Callback;

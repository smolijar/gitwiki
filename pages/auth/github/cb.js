import React from 'react';
import PropTypes from 'prop-types';


class Callback extends React.Component {
  static async getInitialProps({ query }) {
    return { access_token: query.access_token };
  }
  static propTypes = {
    access_token: PropTypes.string.isRequired,
  }
  componentDidMount() {
    window.opener.processCode(this.props.access_token);
    close();
  }
  render() {
    const msg = this.props.access_token ? 'Authentication successful' : 'Missing `access_token` in query';
    return (<span>{msg}</span>);
  }
}

export default Callback;

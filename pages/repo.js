import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    console.log(req.url);
    return { userAgent, path: req.url }
  }

  render() {
    console.log(this.props.url);
    return (
      <div>
        Hello World {this.props.userAgent}
      </div>
    )
  }
}
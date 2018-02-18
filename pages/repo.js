import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    return { repo: {...req.params} }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>{this.props.repo.name} <small>※ {this.props.repo.ref}</small></h1>
        <h2>🌲 {this.props.repo.path}</h2>
      </div>
    )
  }
}
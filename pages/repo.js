import React from 'react'
import fetch from 'isomorphic-fetch';
import Link from 'next/link';
import Head from 'next/head';
import { Button } from 'antd';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    let uri = `/api/v1/repo/${req.params.name}/${req.params.ref}/${req.params.path}`;
    if (req) {
      uri = `${req.protocol}://${req.get('host')}${uri}`;
    }
    console.log(uri);
    const res = await fetch(uri, {
      method: 'GET',
    });
    const response = await res.text();
    return { repo: {...req.params}, ...JSON.parse(response) }
  }

  render() {
    console.log([this.props.repo.name, this.props.repo.ref, this.props.repo.path]);
    const link = item => '/repo/' + [this.props.repo.name, this.props.repo.ref, this.props.repo.path, item.name].filter(p => p !== '').join('/');
    return (
      <div>
        <Head>
          <link rel="stylesheet" type="text/css" href="/antd/antd.css" />
        </Head>
        <h1>{this.props.repo.name} <small>※ {this.props.repo.ref}</small></h1>
        <h2>🌲 {this.props.repo.path}</h2>
        <Button>Test</Button>
        {
          this.props.tree.map((item,i) => <li key={i}><Link href={link(item)}>{item.name}</Link></li>)
        }
        {
          this.props.blob && (
            <pre>{this.props.blob.content}</pre>
          )
        }
      </div>
    )
  }
}
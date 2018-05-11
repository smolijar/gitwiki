import React from 'react';
import AppLayout from '../components/Layout';
import withRedux from '../redux/withRedux';

const Index = () => (
  <AppLayout>
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to GitWiki</h1>
      <p>
        Use navigation bar to list available repositories.
      </p>
    </div>
  </AppLayout>
);

export default withRedux()(Index);

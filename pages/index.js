import React from 'react';
import AppLayout from '../components/Layout';
import withRedux from '../redux/withRedux';

const Index = () => (
  <AppLayout>
    <div style={{ textAlign: 'center' }}>
      <h1>General Kenobi!</h1>
      <img alt="hello-there" src="https://i.imgflip.com/1r3fn3.jpg" />
    </div>
  </AppLayout>
);

export default withRedux()(Index);

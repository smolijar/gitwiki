import withRedux from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import configureStore from './store/configureStore';

export default (mapStateToProps = null, mapDispatchToProps = null) =>
  BaseComponent =>
    withRedux(
      configureStore,
      mapStateToProps,
      mapDispatchToProps,
    )(nextReduxSaga(BaseComponent));

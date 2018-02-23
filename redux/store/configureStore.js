/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import saga from '../sagas';

export default (initialState = {}) => {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const sagaMdw = createSagaMiddleware();

  const middleware = [
    sagaMdw,
  ];

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMdw.run(saga);
  };
  store.runSagaTask();

  return store;
};

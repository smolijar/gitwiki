/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

export default (initialState = {}) => {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const saga = createSagaMiddleware();

  const middleware = [
    saga,
  ];

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  store.sagaTask = saga.run(rootSaga);

  return store;
};

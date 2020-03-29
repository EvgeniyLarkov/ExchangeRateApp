import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './components/App.jsx';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
/* eslint-enable */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);

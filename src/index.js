// Set up your application entry point here...
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import quotesApp from './reducers';
import thunkMiddleware from 'redux-thunk';
import api from './middleware/api';
import 'bootstrap';
import Footer from './components/Footer';

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);

let store = createStoreWithMiddleware(quotesApp);

let rootElement = document.getElementById('app');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import './css/reset.css';
import App from './App';
import store from './store.js';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

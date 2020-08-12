import React from 'react'
import ReactDOM from 'react-dom'

import './css/reset.css'
import './css/index.css'
import App from './App'

import { Provider } from 'react-redux'
import store from './store.js'

import { increment, decrement, asyncDecrement } from './actions/counterAction'

store.dispatch(increment())
store.dispatch(increment())
store.dispatch(decrement())
store.dispatch(asyncDecrement())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

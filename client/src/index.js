import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/App'
import Store from './store'

ReactDOM.render(
  <Store>
    <App />
  </Store>
  ,
  document.getElementById('root')
);


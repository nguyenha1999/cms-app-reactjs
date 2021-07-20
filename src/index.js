import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import configStore from './redux/store';


  const store  = configStore();

  const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>,   
  
  rootElement
);
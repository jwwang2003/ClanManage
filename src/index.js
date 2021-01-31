import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import './index.css';

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

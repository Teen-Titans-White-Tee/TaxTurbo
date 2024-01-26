import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = createRoot(document.querySelector('#root'));
root.render (
  <Provider store={store}>
    <App />
  </Provider>
);
import { OnMemoryCartItemListRepository } from '@example/domain-cart/dist/infrastructure/repository/on-memory'
import React from 'react';
import ReactDOM from 'react-dom';
import { Cart } from './cart/Cart'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Cart repository={new OnMemoryCartItemListRepository()}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from "./store/store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <Suspense fallback={
    <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <span class="loader"></span>
    </div>
    }>
    <App />
    </Suspense>
    </Provider>
  </BrowserRouter>
  </React.StrictMode>
)
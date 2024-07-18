import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from "./store/store";

ReactDOM.createRoot(document.getElementById('root')).render(
    <HashRouter>
    <Provider store={store}>
    <Suspense fallback={
    <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    </div>
    }>
      <App />
    </Suspense>
    </Provider>
  </HashRouter>
)
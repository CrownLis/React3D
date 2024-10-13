import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';

import App from './App';
import { store } from './store';

import '@cyntler/react-doc-viewer/dist/index.css';
import './assets/styles/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Spin size="large" fullscreen />}>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>,
);

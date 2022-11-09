import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap';
import './index.scss';
import App from './features/core/components/App/App';

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

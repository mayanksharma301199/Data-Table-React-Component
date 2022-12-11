import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import App from './App';
import DataTable from './components/DataTable';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /* <App /> */
  <DataTable />
);

reportWebVitals();
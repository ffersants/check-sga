
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import ReactDOM from 'react-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import history from "./services/http/history";

import AuthProvider from "./context/authContext";
import Routes from "./Routes";
import { Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router
      history={history}
    >
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container);

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
  >
    <App />
  </Auth0Provider>

);
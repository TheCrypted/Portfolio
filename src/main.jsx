import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {MousePositionProvider} from "./context/MousePositionProvider.jsx";
import {LinkOverTrigger} from "./context/LinkOverTrigger.jsx";
import {LoadingProvider} from "./context/LoadingProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <LinkOverTrigger>
          <MousePositionProvider>
              <LoadingProvider>
                <App />
              </LoadingProvider>
          </MousePositionProvider>
      </LinkOverTrigger>
  </React.StrictMode>,
)

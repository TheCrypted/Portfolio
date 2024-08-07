import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {MousePositionProvider} from "./context/MousePositionProvider.jsx";
import {LinkOverTrigger} from "./context/LinkOverTrigger.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <LinkOverTrigger>
          <MousePositionProvider>
            <App />
          </MousePositionProvider>
      </LinkOverTrigger>
  </React.StrictMode>,
)

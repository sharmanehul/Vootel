import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import appStore from './redux/appStore.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={appStore}>
    <SocketProvider>
        <App />
    </SocketProvider>
    </Provider>
    <Toaster />
  </React.StrictMode>
)

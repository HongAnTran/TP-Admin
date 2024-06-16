import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthContext from './contexts/AuthContext.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import App from './App.tsx';
import "./index.css"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContext>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContext>
  </React.StrictMode>,
)

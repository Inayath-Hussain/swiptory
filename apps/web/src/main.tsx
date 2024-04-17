import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './style.css'
import './reset.css'
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { AuthTokenProvider } from './context/authTokens.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthTokenProvider>

        <BrowserRouter>
          <App />
        </BrowserRouter>

      </AuthTokenProvider>
    </Provider>
  </React.StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/currencyContext';
import './i18n';
import { ToastProvider } from './context/ToastContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <CurrencyProvider>
        <ToastProvider>
          <App />
        </ToastProvider>        
      </CurrencyProvider>
    </CartProvider>
  </StrictMode>
)

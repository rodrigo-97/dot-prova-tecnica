import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App'
import { CartProvider } from './Contexts/Cart'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { FavoritesProvider } from './Contexts/Favorites'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <App />
        <ToastContainer position='bottom-left' />
      </FavoritesProvider>
    </CartProvider>
  </React.StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { BrowserRouter } from 'react-router-dom'
import Header from './Componets/Header.jsx'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <StrictMode>
          <Header/>
          <App />
      </StrictMode>
  </BrowserRouter>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './context/authContext.jsx'
import './index.css'
import { Toaster } from "react-hot-toast";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Toaster position="top-right"
    reverseOrder={false}
    />
    <App />
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)

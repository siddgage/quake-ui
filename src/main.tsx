import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.tsx'
import './index.css'
import router from './router/AllRoutes.tsx'
import Navbar from './components/common/Navbar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Navbar />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)

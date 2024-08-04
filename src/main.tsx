import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HomePage } from './components/homepage/HomePage.tsx'
import LoginLanding from './components/login/Login.tsx'
import { Signup } from './components/login/Signup.tsx'
import { DefaultErrorPage } from './components/error/DefaultErrorPage.tsx'


const router = createBrowserRouter([{
  path: '/',
  element: <HomePage />,
  errorElement: <DefaultErrorPage />
},
{
  path: '/login',
  element: <LoginLanding />
}, {
  path: '/signup',
  element: <Signup />
}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

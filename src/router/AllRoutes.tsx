import { createBrowserRouter } from "react-router-dom";
import DefaultErrorPage from "../components/error/DefaultErrorPage";
import LoginPage from "../components/login/Login";
import Signup from "../components/login/Signup";
import HomePage from "../components/pages/HomePage";
import UserPage from "../components/pages/UserPage";
import { Test } from "../components/test/Test";
import ProtectedRoutes from "./ProtectedRoutes";


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <DefaultErrorPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        element: <ProtectedRoutes />,  // Protecting nested routes
        children: [
            {
                path: '/user',
                element: <UserPage />
            },
            {
                path: '/*',
                element: <Test />
            },
        ],
    },
])

export default router
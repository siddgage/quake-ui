import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
    const location = useLocation()
    const isAuth = useAuth()

    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to='/login' replace state={{ from: location }} />
    )
}

export default ProtectedRoutes;
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const RequireAuth = () => {
    const { authenticated: auth } = useAuth();
    const location = useLocation();

    return (
        auth ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />
    );
}
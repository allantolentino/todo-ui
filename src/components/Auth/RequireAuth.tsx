import { Button, Typography } from "@mui/material";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const RequireAuth = () => {
    const { authenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const onLogout = () => {
        logout!();
        navigate("/login");
    }

    return (
        authenticated ? 
        <>
            <div className="authHeader container">
                <div className="wrapper">
                    <Button onClick={onLogout}>Logout</Button>
                </div>
            </div>
            <Outlet />
        </>
        : <Navigate to="/login" state={{from: location}} replace />
    );
}
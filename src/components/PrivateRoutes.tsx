import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoutes: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem("authToken");  
    return isAuthenticated ? <Outlet />  : <Navigate to="/login" />;
};

export default PrivateRoutes;

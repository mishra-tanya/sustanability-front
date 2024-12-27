import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoutes: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole"); 

    return isAuthenticated && userRole === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminPrivateRoutes;

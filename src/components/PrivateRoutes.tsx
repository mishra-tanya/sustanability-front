import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRoutesProps {
    children: ReactNode;  
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("authToken");  

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;

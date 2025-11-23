import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isLoggedIn = localStorage.getItem('synchro_logged_in') === 'true';

    if (!isLoggedIn) {
        return <Navigate to="/signup" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

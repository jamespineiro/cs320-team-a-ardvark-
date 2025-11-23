import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactElement;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const isLoggedIn = localStorage.getItem('synchro_logged_in') === 'true';

    if (!isLoggedIn) {
        return <Navigate to="/signup" replace />;
    }

    return children;
};

export default ProtectedRoute;
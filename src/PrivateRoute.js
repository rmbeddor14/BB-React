// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Component }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return currentUser ? (
    Component
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
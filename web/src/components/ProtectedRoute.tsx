import React, { HTMLAttributes, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

interface ProtectedRouteProps extends HTMLAttributes<HTMLDivElement> {
  authenticated?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  authenticated,
}) => {
  const { token } = useContext(AuthContext);

  if (!authenticated) {
    if (!token) return <>{children}</>;
    return <Navigate to='/kanban' />;
  } else if (authenticated && token) {
    return <>{children}</>;
  }

  return <Navigate to='/' />;
};
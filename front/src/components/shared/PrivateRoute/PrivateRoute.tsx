import React, { ReactNode } from 'react';
import { Navigate, PathRouteProps } from 'react-router-dom';

interface PrivateRouteProps extends PathRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuth = true;

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

import React, { type JSX } from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { state } = useAuth();
  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default AuthGuard;
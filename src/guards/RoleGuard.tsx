import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type {Role} from "../types/authData";
import type { ReactElement } from "react";

type RoleGuardProps = {
  allowedRoles: Role[];
  children: ReactElement;
};

const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const { state } = useAuth();

  if (!state.user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(state.user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RoleGuard;




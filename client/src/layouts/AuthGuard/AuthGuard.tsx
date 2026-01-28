import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import type { ReactNode } from "react";


interface AccessGuardProps {
  children: ReactNode;
  roles?: string[];
}

export function AccessGuard({ children, roles }: AccessGuardProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && (!user || !user.roles.some((role) => (roles.includes(role))))) {
    return <Navigate to="/403" replace />;
  }

  return children;
}

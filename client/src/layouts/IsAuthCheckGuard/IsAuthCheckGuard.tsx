import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import type { ReactNode } from "react";


interface IsAuthCheckGuardProps {
  children: ReactNode;
}

export function IsAuthCheckGuard({ children }: IsAuthCheckGuardProps) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

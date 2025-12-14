import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
  requiredPermission?: string;
}

export default function ProtectedRoute({
  allowedRoles,
  children,
  requiredPermission,
}: ProtectedRouteProps) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Admin always has access
  if (user.role === "Admin") {
    return <>{children}</>;
  }

  // Check if user's role is in allowed roles
  if (!allowedRoles.includes(user.role)) {
    // Redirect to their appropriate dashboard
    const redirectPath = user.role === "Receptionist" ? "/secretary-dashboard" : "/";
    return <Navigate to={redirectPath} replace />;
  }

  // If a specific permission is required, check it
  if (requiredPermission && user.role === "Receptionist") {
    const hasPermission = user.permissions?.[requiredPermission] !== false;
    if (!hasPermission) {
      return <Navigate to="/secretary-dashboard" replace />;
    }
  }

  return <>{children}</>;
}

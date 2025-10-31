// src/components/Protected.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../state/auth";

export function RequireLogin({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export function RequireRole({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return user.role === role ? children : <Navigate to="/" replace />;
}

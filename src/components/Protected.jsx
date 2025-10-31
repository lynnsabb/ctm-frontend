// src/components/Protected.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";

/**
 * Protect routes by requiring login or specific roles
 * Example:
 *   <Protected>Students or instructors logged in</Protected>
 *   <Protected role="student">Students only</Protected>
 */
export default function Protected({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return null; // wait until user is loaded

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Wrong role
    return <Navigate to="/" replace />;
  }

  return children;
}

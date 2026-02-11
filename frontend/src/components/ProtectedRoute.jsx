import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading, hasRole } = useAuth();

  if (loading) return <div>Chargement...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !hasRole(roles)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

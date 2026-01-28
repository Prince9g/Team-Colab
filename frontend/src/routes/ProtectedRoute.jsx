import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import Loader from "../components/common/Loader";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // ⏳ Wait until auth check completes
  if (loading) {
    return <Loader />;
  }

  // 🔐 Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // redirect to respective dashboard
    const redirectPath =
      user.role === "lead" ? "/lead" : "/member";

    return <Navigate to={redirectPath} replace />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;

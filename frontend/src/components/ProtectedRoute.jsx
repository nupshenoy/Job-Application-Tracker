// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>; // or spinner
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

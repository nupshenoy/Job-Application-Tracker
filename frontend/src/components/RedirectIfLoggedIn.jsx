// RedirectIfLoggedIn.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectIfLoggedIn = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/dashboard" /> : children;
};

export default RedirectIfLoggedIn;

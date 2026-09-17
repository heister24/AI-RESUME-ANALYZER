import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return null;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;

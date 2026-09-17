import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/authApi";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const res = await getMe();
        setUser(res?.user || null);
      } finally {
        setAuthLoading(false);
      }
    };
    getAndSetUser();
  }, []);

  const value = {
    user,
    setUser,
    authLoading,
    navigate,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// src/state/auth.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getSessionUser, mockLogin, mockLogout } from "../data/mock";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSessionUser());

  useEffect(() => {
    const onStorage = () => setUser(getSessionUser());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = async (email, password) => {
    const u = mockLogin(email, password);
    setUser(u);
    return !!u;
  };

  const logout = () => {
    mockLogout();
    setUser(null);
  };

  const value = {
  user,
  isAuthenticated: !!user, 
  login,
  logout,
};

return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;

}

export const useAuth = () => useContext(AuthCtx);

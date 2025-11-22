// src/state/auth.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);

// Helper function to get user from localStorage
const getSessionUser = () => {
  try {
    const userStr = localStorage.getItem("ctms_user");
    if (userStr) {
      return JSON.parse(userStr);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }
  return null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSessionUser());

  // Sync with localStorage changes
  useEffect(() => {
    const onStorage = () => {
      const updatedUser = getSessionUser();
      setUser(updatedUser);
    };
    window.addEventListener("storage", onStorage);
    
    // Also listen for custom events (for same-tab updates)
    const onUserUpdate = () => {
      const updatedUser = getSessionUser();
      setUser(updatedUser);
    };
    window.addEventListener("userUpdated", onUserUpdate);
    
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("userUpdated", onUserUpdate);
    };
  }, []);

  const login = async (email, password) => {
    // This is handled by Login.jsx directly
    // But we can sync here if needed
    const updatedUser = getSessionUser();
    setUser(updatedUser);
    return !!updatedUser;
  };

  const logout = () => {
    localStorage.removeItem("ctm_token");
    localStorage.removeItem("ctms_user");
    setUser(null);
  };

  // Update user function for profile updates
  const updateUser = (updatedUser) => {
    if (updatedUser) {
      // Remove password if present
      const { password, ...userWithoutPassword } = updatedUser;
      localStorage.setItem("ctms_user", JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new Event("userUpdated"));
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);

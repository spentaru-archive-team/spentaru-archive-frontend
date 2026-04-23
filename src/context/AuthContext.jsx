/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { csrf, login as loginRequest, logout as logoutRequest, me } from "@/services/auth.service";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async ({ silent = false } = {}) => {
    if (!silent) {
      setLoading(true);
    }

    try {
      const res = await me();
      const nextUser = res?.data?.data ?? res?.data ?? null;
      setUser(nextUser);
      return nextUser;

    } catch (err) {
      setUser(null);
      return null;
      
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUser().catch(() => null);
  }, []);

  const login = async (credentials) => {
    await csrf();
    const response = await loginRequest(credentials);
    await fetchUser({ silent: true }).catch(() => null);

    return response;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {
      // Keep local state clean even if server session is already invalid.
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

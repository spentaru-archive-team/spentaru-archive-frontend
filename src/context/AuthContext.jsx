/* eslint-disable react-refresh/only-export-components */
import { me } from "@/services/auth.service";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const extractUserFromPayload = (payload) => {
  if (!payload || typeof payload !== "object") return null;

  // Login response can be { token, user } or directly user fields.
  if (payload.user && typeof payload.user === "object") {
    return payload.user;
  }

  const user = { ...payload };
  delete user.token;

  return Object.keys(user).length ? user : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await me();
        if (res.data.status == 'success') {
          setUser(res.data.data);
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = (data) => {
    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    const nextUser = extractUserFromPayload(data);
    setUser(nextUser);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

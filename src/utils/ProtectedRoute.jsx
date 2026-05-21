import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/hooks/use-auth";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

const ROLE_ALLOWED_PATHS = {
  guru: [
    "/dashboard",
    "/events",
    "/archives",
    "/archive-locations",
    "/cabinets",
    "/settings",
    "/about",
  ],
};

const isPathAllowed = (role, pathname) => {
  if (role === "admin") return true;

  const allowedPaths = ROLE_ALLOWED_PATHS[role];
  if (!allowedPaths) return false;

  return allowedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
};

export default function ProtectedRoute() {
  const location = useLocation();
  const { loading, isAuthenticated, user } = useAuth();
  const normalizedRole = String(user?.role || "").toLowerCase();

  if (loading) return <FullScreenLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isPathAllowed(normalizedRole, location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

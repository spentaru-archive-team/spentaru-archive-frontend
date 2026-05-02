import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/hooks/use-auth";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

const ROLE_ALLOWED_PATHS = {
  guru: [
    "/dashboard",
    "/archives",
    "/archive-locations",
    "/cabinets",
    "/settings",
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

  if (loading) return <FullScreenLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isPathAllowed(user?.role, location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

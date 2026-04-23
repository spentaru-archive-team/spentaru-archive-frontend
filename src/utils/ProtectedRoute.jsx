import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/hooks/use-auth";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <FullScreenLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

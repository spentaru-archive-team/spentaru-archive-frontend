import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/hooks/use-auth";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

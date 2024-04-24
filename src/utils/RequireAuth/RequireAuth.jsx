import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice.js";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

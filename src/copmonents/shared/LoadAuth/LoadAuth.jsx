import React, { useEffect } from "react";
import { setCredentials } from "@/features/auth/authSlice.js";
import { useDispatch } from "react-redux";
import { useGetCurrentUserQuery } from "@/features/auth/authApiSlice.js";

export const LoadAuth = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(setCredentials({ accessToken }));
    }
  }, [dispatch]);

  const { isLoading } = useGetCurrentUserQuery();
  if (isLoading) return <div>Loading...</div>;

  return children;
};

import React, { useEffect } from "react";
import { useCurrentUserQuery } from "@/features/user/userApiSlice.js";
import { setCredentials } from "@/features/auth/authSlice.js";
import { useDispatch } from "react-redux";

export const LoadAuth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(setCredentials({ accessToken }));
    }
  }, [dispatch]);

  const { isLoading } = useCurrentUserQuery();
  if (isLoading) return <div>Loading...</div>;

  return children;
};

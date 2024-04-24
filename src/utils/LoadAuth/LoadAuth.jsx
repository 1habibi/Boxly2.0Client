import React, { useEffect, useState } from "react";
import {
  selectCurrentUser,
  selectIsTokenRefreshing,
  setCredentials,
} from "@/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCurrentProfileQuery,
  useGetCurrentUserQuery,
} from "@/features/auth/authApiSlice.js";
import { Flex, Spin } from "antd";

export const LoadAuth = ({ children }) => {
  const dispatch = useDispatch();
  const isTokenRefreshing = useSelector(selectIsTokenRefreshing);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(setCredentials({ accessToken }));
    }
  }, [dispatch]);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetCurrentUserQuery(undefined, {
    skip: !sessionStorage.getItem("accessToken"),
  });
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetCurrentProfileQuery(user?.id, {
    skip: !user,
  });

  const isLoading = isUserLoading || isProfileLoading || isTokenRefreshing;
  const hasError = isUserError || isProfileError;

  if ((hasError || !profile || !user) && !isLoading) {
    // Handle the case when user or profile data is not available
    return children;
  }

  if (isLoading)
    return (
      <div>
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      </div>
    );

  return children;
};

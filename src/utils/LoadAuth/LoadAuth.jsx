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

  const currentUser = useSelector(selectCurrentUser);
  console.log("current user from load auth", currentUser);

  const { isLoading: isUserLoading } = useGetCurrentUserQuery();
  const { isLoading: isProfileLoading } = useGetCurrentProfileQuery(
    currentUser?.id
  );
  if (isUserLoading || isProfileLoading || isTokenRefreshing)
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

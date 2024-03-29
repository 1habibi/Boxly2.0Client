import React, { useEffect } from "react";
import { useGetCurrentUserQuery } from "@/features/auth/authApiSlice.js";

export const MeTest = () => {
  const { data, isLoading, error } = useGetCurrentUserQuery();

  // Обработайте состояния загрузки, ошибки и отображение данных
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

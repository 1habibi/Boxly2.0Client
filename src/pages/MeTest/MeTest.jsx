import React, { useEffect } from "react";
import { useMeQuery } from "@/features/user/userApiSlice.js";

export const MeTest = () => {
  const { data: me, isLoading, error } = useMeQuery();

  // Обработайте состояния загрузки, ошибки и отображение данных
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  console.log(me);

  return <div>{JSON.stringify(me, null, 2)}</div>;
};

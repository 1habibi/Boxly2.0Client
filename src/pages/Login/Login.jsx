import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useLazyGetCurrentProfileQuery,
  useLazyGetCurrentUserQuery,
  useLoginMutation,
} from "@/features/auth/authApiSlice.js";
import { PATH } from "@/router/index.jsx";
import { LoginForm } from "@/pages/Login/LoginForm/LoginForm.jsx";

export const Login = () => {
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [getCurrentUser, { isFetching: isCurrentUserLoading }] =
    useLazyGetCurrentUserQuery();
  const [getCurrentProfile, { isFetching: isCurrentProfileLoading }] =
    useLazyGetCurrentProfileQuery();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = React.useState("");

  const handleSubmit = async (values) => {
    try {
      await login(values).unwrap();
      const userDetails = await getCurrentUser();
      await getCurrentProfile(userDetails.data.id);
      navigate(PATH.HOME);
    } catch (e) {
      setErrMsg("Неверный логин или пароль");
    }
  };

  if (isLoginLoading || isCurrentProfileLoading || isCurrentUserLoading)
    return (
      <div>
        <h1>
          Загрузка...
          <LoadingOutlined style={{ marginLeft: "10px" }} />
        </h1>
      </div>
    );

  return (
    <>
      <h1>Вход в систему</h1>
      <LoginForm
        onFinish={handleSubmit}
        isLoading={isLoginLoading}
        errMsg={errMsg}
      />
    </>
  );
};

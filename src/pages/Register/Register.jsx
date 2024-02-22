import React from "react";
import { notification } from "antd";
import { useRegisterMutation } from "@/features/auth/authApiSlice.js";
import { PATH } from "@/router/index.jsx";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "@/pages/Register/RegisterForm/RegisterForm.jsx";

export const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    try {
      await register({ email, password }).unwrap();
      navigate(PATH.LOGIN);
      notification.success({
        message: "Успешная регистрация",
        description:
          "Вы успешно зарегистрировались. Пожалуйста, войдите в свой аккаунт.",
      });
    } catch (e) {
      console.error("Ошибка регистрации:", e);
      notification.error({
        message: "Ошибка регистрации",
        description:
          "Что-то пошло не так при регистрации. Пожалуйста, попробуйте снова.",
      });
    }
  };

  return <RegisterForm onFinish={handleSubmit} isLoading={isLoading} />;
};

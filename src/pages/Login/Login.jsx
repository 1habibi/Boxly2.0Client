import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/features/auth/authApiSlice.js";
import { PATH } from "@/router/index.jsx";
import { useCurrentUserQuery } from "@/features/user/userApiSlice.js";

export const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async ({ email, password }) => {
    try {
      const userData = await login({ email, password }).unwrap();
      console.log("userDataFromHandleSubmit:", userData);
      sessionStorage.setItem("accessToken", userData.accessToken);
      setEmail("");
      setPassword("");
      navigate(PATH.HOME);
    } catch (e) {
      setErrMsg("Неверный логин или пароль");
      // errRef.current.focus();
    }
  };
  const handleUserImport = (e) => {
    setEmail(e.target.value);
  };
  const handlePwdImport = (e) => {
    setPassword(e.target.value);
  };

  if (isLoading) return <h1>Загрузка...</h1>;

  return (
    <>
      <Form
        name="login"
        onFinish={handleSubmit}
        initialValues={{ email: "test2@mail.ru", password: "123456" }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Невалидная почта",
            },
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Адрес эл.почты"
            onChange={handleUserImport}
            value={email}
            ref={userRef}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
            onChange={handlePwdImport}
            value={password}
          />
        </Form.Item>
        <p style={{ color: "red", fontSize: "16px" }} ref={errRef}>
          {errMsg}
        </p>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Вход
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

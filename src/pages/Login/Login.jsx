import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/features/auth/authApiSlice.js";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice.js";
import { PATH } from "@/router/index.jsx";

export const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async ({ email, password }) => {
    try {
      const userData = await login({ email, password }).unwrap();
      // userData.accessToken = userData.accessToken.substring(7);
      console.log(userData.accessToken.substring(7));
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPassword("");
      navigate(PATH.WELCOME);
    } catch (e) {
      if (!e?.status) {
        setErrMsg("Сервер недоступен");
      } else if (e.status === 400) {
        setErrMsg("Неправильная почта или пароль");
      } else if (e.status === 401) {
        setErrMsg("Не авторизован");
      } else {
        setErrMsg("Ошибка входа");
      }
      errRef.current.focus();
    }
  };

  const handleUserImport = (e) => {
    setEmail(e.target.value);
  };

  const handlePwdImport = (e) => {
    setPassword(e.target.value);
  };

  const content = isLoading ? (
    <h1>Загрузка...</h1>
  ) : (
    <>
      <p ref={errRef}>{errMsg}</p>
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

  return content;
};

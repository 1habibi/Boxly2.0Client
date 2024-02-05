import React from "react";
import { Button, Form, Input, notification, Space } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRegisterMutation } from "@/features/auth/authApiSlice.js";
import { PATH } from "@/router/index.jsx";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    try {
      const data = await register({ email, password }).unwrap();
      navigate(PATH.LOGIN);
    } catch (e) {
      console.error("Registration failed:", e);
    }
  };

  const content = isLoading ? (
    <h1>Загрузка..</h1>
  ) : (
    <div>
      <Form name="register" onFinish={handleSubmit}>
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
          <Input prefix={<MailOutlined />} placeholder="Адрес эл.почты" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
            {
              pattern: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
              message:
                "Длинна пароля - минимум 8 символов. Должен содержать большие и маленькие буквы, цифры, а также символы",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
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
    </div>
  );

  return content;
};

import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

export const RegisterForm = ({ onFinish, isLoading }) => {
  return (
    <div>
      <Form name="register" onFinish={onFinish}>
        <Form.Item
          name="email"
          hasFeedback
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
          hasFeedback
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

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Повторите пароль",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Повторите пароль"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
          >
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

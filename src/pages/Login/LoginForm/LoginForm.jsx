import React, { useEffect, useRef } from "react";
import { Alert, Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

export const LoginForm = ({ onFinish, isLoading, errMsg }) => {
  const userRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
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
          />
        </Form.Item>
        {errMsg && (
          <Alert
            style={{ marginBottom: "24px" }}
            message={errMsg}
            type="error"
          />
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            Вход
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

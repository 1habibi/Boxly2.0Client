import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Input } from "antd";
import {
	EyeInvisibleOutlined,
	EyeOutlined,
	EyeTwoTone,
	LockOutlined,
	MailOutlined
} from "@ant-design/icons";
import { PATH } from "@/router/paths";
import { Link } from "react-router-dom";

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
				layout="vertical"
				name="login"
				onFinish={onFinish}
				initialValues={{ email: "test2@mail.ru", password: "1234567A&" }}
			>
				<Form.Item
					name="email"
					label={
						<label style={{ fontSize: "18px", fontWeight: "500" }}>
							Эл. Почта
						</label>
					}
					rules={[
						{
							type: "email",
							message: "Невалидная почта"
						},
						{
							required: true,
							message: "Обязательное поле"
						}
					]}
				>
					<Input
						style={{ fontSize: "18px" }}
						placeholder="Почта"
						prefix={<MailOutlined style={{ marginRight: "10px" }} />}
						ref={userRef}
					/>
				</Form.Item>
				<Form.Item
					name="password"
					label={
						<label style={{ fontSize: "18px", fontWeight: "500" }}>
							Пароль
						</label>
					}
					rules={[
						{
							required: true,
							message: "Обязательное поле"
						}
					]}
				>
					<Input.Password
						style={{ fontSize: "18px" }}
						prefix={<LockOutlined style={{ marginRight: "10px" }} />}
						iconRender={visible =>
							visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
						}
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
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							loading={isLoading}
							disabled={isLoading}
						>
							Войти
						</Button>
						<Link
							style={{ fontSize: "18px", fontWeight: "500" }}
							to={PATH.REGISTER}
						>
							Нет профиля?
						</Link>
					</div>
				</Form.Item>
			</Form>
		</>
	);
};

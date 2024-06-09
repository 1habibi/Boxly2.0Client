import {
	EyeInvisibleOutlined,
	EyeOutlined,
	LockOutlined,
	MailOutlined
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";

export const ChangeEmailForm = ({ onFinish, isSubmitting }) => {
	return (
		<Form onFinish={onFinish} name="change-email-form" layout="vertical">
			<Form.Item
				name="newEmail"
				label={
					<label style={{ fontSize: "14px", fontWeight: "500" }}>
						Новый адрес эл.почты
					</label>
				}
				hasFeedback
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
					style={{ fontSize: "14px" }}
					prefix={<MailOutlined style={{ marginRight: "10px" }} />}
				/>
			</Form.Item>
			<Form.Item
				name="password"
				hasFeedback
				label={
					<label style={{ fontSize: "15px", fontWeight: "500" }}>Пароль</label>
				}
				rules={[
					{
						required: true,
						message: "Обязательное поле"
					}
				]}
			>
				<Input.Password
					style={{ fontSize: "15px" }}
					prefix={<LockOutlined style={{ marginRight: "10px" }} />}
					iconRender={visible =>
						visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
					}
				/>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" loading={isSubmitting}>
					{isSubmitting ? "Сохранение..." : "Сохранить"}
				</Button>
			</Form.Item>
		</Form>
	);
};

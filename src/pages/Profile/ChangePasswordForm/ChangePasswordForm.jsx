import {
	EyeInvisibleOutlined,
	EyeOutlined,
	LockOutlined
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";

export const ChangePasswordForm = ({ onFinish, isSubmitting }) => {
	return (
		<Form onFinish={onFinish} name="change-password-form" layout="vertical">
			<Form.Item
				name="oldPassword"
				hasFeedback
				label={
					<label style={{ fontSize: "15px", fontWeight: "500" }}>
						Текущий пароль
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
					style={{ fontSize: "15px" }}
					prefix={<LockOutlined style={{ marginRight: "10px" }} />}
					iconRender={visible =>
						visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
					}
				/>
			</Form.Item>
			<Form.Item
				name="newPassword"
				hasFeedback
				label={
					<label style={{ fontSize: "15px", fontWeight: "500" }}>
						Новый пароль
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

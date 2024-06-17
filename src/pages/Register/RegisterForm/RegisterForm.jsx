import { PATH } from "@/router/paths";
import {
	EyeInvisibleOutlined,
	EyeOutlined,
	LockOutlined,
	MailOutlined
} from "@ant-design/icons";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

export const RegisterForm = ({ onFinish, isLoading }) => {
	const handleVerificationSuccess = (token, ekey) => {
		console.log(token, ekey);
	};
	return (
		<Form layout="vertical" name="register" onFinish={onFinish}>
			<Form.Item
				name="email"
				label={
					<label style={{ fontSize: "18px", fontWeight: "500" }}>
						Эл. Почта
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
					style={{ fontSize: "18px" }}
					prefix={<MailOutlined style={{ marginRight: "10px" }} />}
					placeholder="Адрес эл.почты"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				hasFeedback
				label={
					<label style={{ fontSize: "18px", fontWeight: "500" }}>Пароль</label>
				}
				rules={[
					{
						required: true,
						message: "Обязательное поле"
					},
					{
						pattern: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
						message:
							"Длинна пароля - минимум 8 символов. Должен содержать большие и маленькие буквы, цифры, а также символы"
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
			<Form.Item
				name="confirm"
				dependencies={["password"]}
				hasFeedback
				label={
					<label style={{ fontSize: "18px", fontWeight: "500" }}>
						Повторите пароль
					</label>
				}
				rules={[
					{
						required: true,
						message: "Повторите пароль"
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("Пароли не совпадают!"));
						}
					})
				]}
			>
				<Input.Password
					style={{ fontSize: "18px" }}
					prefix={<LockOutlined style={{ marginRight: "10px" }} />}
					iconRender={visible =>
						visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
					}
					placeholder="Повторите пароль"
				/>
			</Form.Item>
			<HCaptcha
				sitekey="1fb8bcdb-fa94-4199-973f-5f62c31e0593"
				onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
			/>
			<Form.Item>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Button
						type="primary"
						htmlType="submit"
						size="large"
						className="login-form-button"
						loading={isLoading}
					>
						Регистрация
					</Button>
					<Link style={{ fontSize: "18px", fontWeight: "500" }} to={PATH.LOGIN}>
						Уже зарегистрированы?
					</Link>
				</div>
			</Form.Item>
		</Form>
	);
};

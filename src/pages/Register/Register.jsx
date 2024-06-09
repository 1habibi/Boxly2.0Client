import { useRegisterMutation } from "@/features/auth/authApiSlice.js";
import { RegisterForm } from "@/pages/Register/RegisterForm/RegisterForm.jsx";
import { PATH } from "@/router/paths";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { notification } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { BlockBackground } from "@/utils/BlockBackground/BlockBackground";

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
					"Вы успешно зарегистрировались. Пожалуйста, войдите в свой аккаунт."
			});
		} catch (e) {
			console.error("Ошибка регистрации:", e);
			notification.error({
				message: "Ошибка регистрации",
				description:
					"Что-то пошло не так при регистрации. Пожалуйста, попробуйте снова."
			});
		}
	};

	return (
		<div>
			<div
				style={{
					width: "70%",
					margin: "0 auto"
				}}
			>
				<BlockBackground>
					<RegisterForm onFinish={handleSubmit} isLoading={isLoading} />
				</BlockBackground>
			</div>
		</div>
	);
};

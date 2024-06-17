import {
	useLazyGetCurrentProfileQuery,
	useLazyGetCurrentUserQuery,
	useLoginMutation
} from "@/features/auth/authApiSlice.js";
import { LoginForm } from "@/pages/Login/LoginForm/LoginForm.jsx";
import { PATH } from "@/router/paths";
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

import { BlockBackground } from "@/utils/BlockBackground/BlockBackground";

export const Login = () => {
	const [login, { isLoading: isLoginLoading }] = useLoginMutation();
	const [getCurrentUser, { isFetching: isCurrentUserLoading }] =
		useLazyGetCurrentUserQuery();
	const [getCurrentProfile, { isFetching: isCurrentProfileLoading }] =
		useLazyGetCurrentProfileQuery();
	const navigate = useNavigate();
	const [errMsg, setErrMsg] = React.useState("");

	const handleSubmit = async values => {
		try {
			await login(values).unwrap();
			const userDetails = await getCurrentUser();
			await getCurrentProfile(userDetails.data.id);
			navigate(PATH.HOME);
		} catch (e) {
			setErrMsg("Неверный логин или пароль");
		}
	};

	if (isLoginLoading || isCurrentProfileLoading || isCurrentUserLoading)
		return (
			<div>
				<h1>
					Загрузка...
					<LoadingOutlined style={{ marginLeft: "10px" }} />
				</h1>
			</div>
		);

	return (
		<>
			<div
				style={{
					width: "70%",
					margin: "0 auto"
				}}
			>
				<BlockBackground>
					<LoginForm
						onFinish={handleSubmit}
						isLoading={isLoginLoading}
						errMsg={errMsg}
					/>
				</BlockBackground>
			</div>
		</>
	);
};

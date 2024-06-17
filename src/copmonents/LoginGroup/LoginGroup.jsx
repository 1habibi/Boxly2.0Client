import s from "./LoginGroup.module.scss";
import {
	useGetCurrentProfileQuery,
	useGetCurrentUserQuery
} from "@/features/auth/authApiSlice.js";
import { logOut, selectIsAuthenticated } from "@/features/auth/authSlice.js";
import { PATH } from "@/router/paths";
import { Button, Dropdown, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { useToken } = theme;

export const LoginGroup = () => {
	const { token } = useToken();
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuthenticated);
	const { data: user } = useGetCurrentUserQuery();
	const { data: profile } = useGetCurrentProfileQuery(user?.id);
	const dispalyName =
		(profile && `${profile?.name} ${profile?.surname}`) || user?.email;

	const menuItems = [
		{ label: <Link to={PATH.USER_PROFILE}>Профиль</Link>, key: 1 },
		{
			label: (
				<a
					onClick={e => {
						e.preventDefault();
						dispatch(logOut());
					}}
				>
					Выход
				</a>
			),
			key: 2
		}
	];

	if (user?.roles.includes("ADMIN")) {
		menuItems.push({
			label: (
				<Link
					style={{ fontWeight: 600, color: token.colorPrimary }}
					to={PATH.ADMIN_DASHBOARD}
				>
					Админ панель
				</Link>
			),
			key: 3
		});
	}

	if (isAuth && user) {
		return (
			<div className={s.loginGroup}>
				<div>
					<Dropdown
						menu={{
							items: menuItems
						}}
					>
						<Button style={{ fontWeight: "bold" }} size={"large"} type={"text"}>
							{dispalyName}
						</Button>
					</Dropdown>
				</div>
			</div>
		);
	}

	return (
		<div className={s.loginGroup}>
			<Link to={PATH.LOGIN}>
				<Button size="large" type={"primary"}>
					Войти
				</Button>
			</Link>
			<Link to={PATH.REGISTER}>
				<Button size={"large"}>Регистрация</Button>
			</Link>
		</div>
	);
};

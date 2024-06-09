import React, { useState } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import s from "./AppMenu.module.scss";
import { PATH } from "@/router/paths";

const menuItems = [
	{
		label: (
			<Link className={s.link} to={PATH.HOME}>
				Главная
			</Link>
		),
		key: "home"
	},
	{
		label: (
			<Link className={s.link} to={PATH.MY_ORDERS}>
				Мои заказы
			</Link>
		),
		key: "my_orders"
	}
];
export const AppMenu = ({ mode = "horizontal" }) => {
	const location = useLocation();
	const [current, setCurrent] = useState("home");
	const onClick = e => {
		setCurrent(e.key);
	};

	const getCurrentKey = () => {
		switch (location.pathname) {
			case "/":
				return "home";
			case "/order":
				return "my_orders";
			default:
				return null;
		}
	};

	return (
		<Menu
			onClick={onClick}
			mode={mode}
			selectedKeys={[getCurrentKey()]}
			items={menuItems}
			style={{
				width: "100%",
				border: 0,
				fontSize: "18px",
				marginLeft: "30px",
				marginRight: "auto"
			}}
		/>
	);
};

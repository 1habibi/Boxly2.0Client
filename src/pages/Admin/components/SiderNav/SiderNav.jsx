import { Logo } from "@/copmonents/Logo/Logo";
import {
	BarChartOutlined,
	CodeSandboxOutlined,
	UserOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import s from "./SiderNav.module.scss";
import { PATH } from "@/router/paths";

const menuItems = [
	{
		key: "dashboard",
		label: (
			<NavLink className={s.navLink} to={PATH.ADMIN_DASHBOARD}>
				<span>
					<BarChartOutlined style={{ fontSize: "18px" }} />
				</span>
				<span className={s.navLinkTitle}>Dashboard</span>
			</NavLink>
		)
	},
	{
		key: "orders",
		label: (
			<NavLink className={s.navLink} to={PATH.ADMIN_ORDERS}>
				<span>
					<CodeSandboxOutlined style={{ fontSize: "18px" }} />
				</span>
				<span className={s.navLinkTitle}>Orders</span>
			</NavLink>
		)
	}
];

export default function SiderNav() {
	return (
		<>
			<div className="brand">
				<div style={{ width: "100%" }}>
					<Logo></Logo>
				</div>
			</div>
			<hr className={s.hr} />
			<Menu className={s.menu} items={menuItems} />
		</>
	);
}

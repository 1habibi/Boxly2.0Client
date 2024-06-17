import s from "./App.module.scss";
import { AppMenu } from "@/copmonents/AppMenu/AppMenu";
import { LoginGroup } from "@/copmonents/LoginGroup/LoginGroup.jsx";
import { Logo } from "@/copmonents/Logo/Logo.jsx";
import { Button, Drawer, Layout } from "antd";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const { Header, Footer, Content } = Layout;

function AppLayout() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<Layout className={s.appLayout}>
			<Header className={s.header}>
				<Logo></Logo>
				{windowWidth < 768 ? (
					<>
						<Button type="primary" onClick={showDrawer}>
							☰
						</Button>
						<Drawer
							title={<LoginGroup></LoginGroup>}
							placement="left"
							onClose={onClose}
							open={visible}
						>
							<AppMenu mode={"vertical"}></AppMenu>
						</Drawer>
					</>
				) : (
					<>
						<AppMenu></AppMenu>
						<LoginGroup></LoginGroup>
					</>
				)}
			</Header>
			<Content className={s.content}>
				<Outlet />
			</Content>
			<Footer className={s.footer}>Boxly ©2024 Created by habibi</Footer>
		</Layout>
	);
}

export default AppLayout;

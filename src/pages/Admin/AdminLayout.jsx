import React, { useState } from "react";
import { Affix, Button, Drawer, Layout } from "antd";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { PATH } from "@/router";
import Dashboard from "./Dashboard";

const { Header, Footer, Content, Sider } = Layout;
export default function AdminLayout({ children }) {
	return (
		<>
			<Layout>
				<Sider>SIDER</Sider>
				<Layout>
					<Header>Header</Header>
					<Content>
						<Outlet />
					</Content>
					<Footer />
				</Layout>
			</Layout>
		</>
	);
}

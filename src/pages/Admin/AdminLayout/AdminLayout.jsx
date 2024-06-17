import SiderNav from "../components/SiderNav/SiderNav";
import s from "./AdminLayout.module.scss";
import { HeartFilled } from "@ant-design/icons";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Footer, Content, Sider } = Layout;

export default function AdminLayout() {
	return (
		<>
			<Layout style={{ backgroundColor: "white" }}>
				<Sider
					width={250}
					className={s.sider}
					style={{ backgroundColor: "white" }}
				>
					<SiderNav></SiderNav>
				</Sider>
				<Layout>
					{/* <Header className={s.header}>Header</Header> */}
					<Content className={s.content}>
						<Outlet />
					</Content>
					<Footer className={s.footer}>
						<div className="copyright">
							© 2024, made with
							{<HeartFilled style={{ color: "#f5222d", margin: " 0px 5px" }} />}
							by{" "}
							<a
								href="https://t.me/habibi1213"
								className="font-weight-bold"
								target="_blank"
								rel="noreferrer"
							>
								habibi
							</a>
						</div>
					</Footer>
				</Layout>
			</Layout>
		</>
	);
}

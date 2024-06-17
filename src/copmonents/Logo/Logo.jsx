import s from "./Logo.module.scss";
import { PATH } from "@/router/paths";
import { Link } from "react-router-dom";

export const Logo = () => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100%"
			}}
		>
			<Link style={{ height: "100%" }} to={PATH.HOME}>
				<img className={s.logo} src="/logo.svg" alt="logo" />
			</Link>
		</div>
	);
};

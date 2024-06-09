import React from "react";
import s from "./Logo.module.scss";
import { Link } from "react-router-dom";
import { PATH } from "@/router/paths";

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

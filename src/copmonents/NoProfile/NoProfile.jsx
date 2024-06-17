import { PATH } from "@/router/paths";
import { Button, theme } from "antd";
import { Link } from "react-router-dom";

const { useToken } = theme;

const NoProfile = () => {
	const { token } = useToken();

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column"
			}}
		>
			<img
				// style={{ width: "35%" }}
				style={{ maxWidth: "400px", width: "100%" }}
				src="/img/no-profile.svg"
				alt="Не заполнен профиль"
			/>
			<div style={{ textAlign: "center" }}>
				<p
					style={{
						fontSize: "40px",
						color: token.colorPrimary,
						fontWeight: "900",
						marginBottom: "10px"
					}}
				>
					Вы еще не заполнили профиль!
				</p>
				<p style={{ fontSize: "20px" }}>
					Не торопитесь, перед тем как сделать заказ нужно заполнить профиль
				</p>
				<Link to={PATH.USER_PROFILE}>
					<Button style={{ marginTop: "10px" }} size={"large"}>
						Мой профиль
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default NoProfile;

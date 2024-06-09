import UserOrdersTable from "./UserOrdersTable";
import NoProfile from "@/copmonents/NoProfile/NoProfile";
import {
	useGetCurrentProfileQuery,
	useGetCurrentUserQuery
} from "@/features/auth/authApiSlice.js";
import { useGetUserOrdersQuery } from "@/features/order/orderApiSlice.js";
import OrderModal from "@/pages/Orders/OrderModal/OrderModal.jsx";
import { PATH } from "@/router/paths";
import { theme } from "antd";
import { Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const { useToken } = theme;

export const MyOrders = () => {
	const { data: user } = useGetCurrentUserQuery();
	const { data: profile } = useGetCurrentProfileQuery(user.id);
	const { data: orders, error, isLoading } = useGetUserOrdersQuery(user.id);
	const [modalOpen, setModalOpen] = useState(false);
	const { token } = useToken();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error || !orders) {
		return <div>Произошла ошибка загрузки данных</div>;
	}

	if (orders.length === 0 && profile) {
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
					style={{ maxWidth: "400px", width: "100%" }}
					src="/img/not-found-orders.svg"
					alt="Заказов нет"
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
						Заказов еще нет!
					</p>
					<p style={{ fontSize: "20px" }}>
						Волнительный момент, но сейчас вы можете сделать свой{" "}
						<span
							style={{
								color: token.colorPrimary,
								fontWeight: "900",
								fontSize: "24px"
							}}
						>
							первый
						</span>
					</p>
					<Button
						style={{ marginTop: "10px" }}
						type="primary"
						size={"large"}
						onClick={() => {
							setModalOpen(true);
						}}
					>
						Новый заказ
					</Button>
					<OrderModal
						modalOpen={modalOpen}
						closeModal={() => setModalOpen(false)}
					/>
				</div>
			</div>
		);
	}

	if (!profile) {
		return <NoProfile />;
	}

	return (
		<>
			<UserOrdersTable orders={orders} />
			<Button
				style={{ marginTop: "20px" }}
				type="primary"
				size={"large"}
				onClick={() => setModalOpen(true)}
			>
				Новый заказ
			</Button>
			<OrderModal
				modalOpen={modalOpen}
				closeModal={() => setModalOpen(false)}
			/>
		</>
	);
};

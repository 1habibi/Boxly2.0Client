import React from "react";
import { Button, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom";
import { BarcodeOutlined, FileAddOutlined } from "@ant-design/icons";
import { PATH } from "@/router/paths";

const OrderModal = ({ modalOpen, closeModal }) => (
	<Modal
		title="Выберите способ оформления заказа"
		centered
		open={modalOpen}
		onCancel={closeModal}
		footer={null}
		width={"1000px"}
	>
		<p>Хотите сделать заказ с нашей помощью или ваш заказ уже прибыл?</p>
		<Row gutter={[16, 16]}>
			<Col xs={24} md={24} lg={12}>
				<Link
					to={PATH.NEW_ORDER}
					style={{
						width: "100%",
						height: "100%",
						textDecoration: "none"
					}}
				>
					<Button
						style={{
							width: "100%",
							height: "150px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							padding: "15px",
							alignItems: "center"
						}}
					>
						<FileAddOutlined style={{ fontSize: "54px" }} />
						<span style={{ fontSize: "34px" }}>Новый заказ</span>
					</Button>
				</Link>
			</Col>
			<Col xs={24} md={24} lg={12}>
				<Link
					to={PATH.NEW_ORDER_QR}
					style={{
						width: "100%",
						height: "100%",
						textDecoration: "none"
					}}
				>
					<Button
						style={{
							width: "100%",
							height: "150px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							padding: "15px",
							alignItems: "center"
						}}
					>
						<BarcodeOutlined style={{ fontSize: "54px" }} />
						<span style={{ fontSize: "34px" }}>Загрузить штрих-код</span>
						<span
							style={{
								fontSize: "15px",
								opacity: "0.5"
							}}
						>
							Только для Ozon, Wildberries, СберМаркет и ЯндексМаркет
						</span>
					</Button>
				</Link>
			</Col>
		</Row>
	</Modal>
);

export default OrderModal;

import DeleteOrderButton from "./DeleteOrderButton/DeleteOrderButton";
import { useGetCurrentUserQuery } from "@/features/auth/authApiSlice.js";
import {
	useDeleteOrderMutation,
	useEditOrderMutation,
	useGetOrderByIdWithItemsQuery
} from "@/features/order/orderApiSlice.js";
import {
	CarOutlined,
	DollarOutlined,
	DropboxOutlined,
	FrownOutlined,
	SmileOutlined,
	UserOutlined
} from "@ant-design/icons";
import {
	Button,
	Col,
	Divider,
	Modal,
	Radio,
	Rate,
	Row,
	Steps,
	message
} from "antd";
import { IKImage } from "imagekitio-react";
import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { BlockBackground } from "@/utils/BlockBackground/BlockBackground";
import { ORDER_STATUSES } from "@/utils/OrderStatuses";

const OrderDetails = () => {
	const { id } = useParams();
	const { data: order, isLoading, error } = useGetOrderByIdWithItemsQuery(id);
	const { data: currentUser } = useGetCurrentUserQuery();
	const [deleteOrder] = useDeleteOrderMutation();
	const [selecterDeliveryType, setSelectedDeliveryType] = useState(null);
	const [editOrder] = useEditOrderMutation();

	const navigate = useNavigate();

	const handleChangeRate = async rate => {
		const orderData = {
			rate
		};
		console.log(orderData);
		try {
			await editOrder({ orderData, id }).unwrap();
		} catch (e) {
			console.error("Ошибка редактирования: ", e);
		}
	};

	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <div>Произошла ошибка загрузки данных</div>;

	if (!order || (currentUser && order.customerId !== currentUser.id)) {
		return <Navigate to="/orders" />;
	}

	if (order.deliveryType === null) {
		return (
			<Modal
				title="Выберите тип доставки"
				visible={true}
				onOk={() => {
					editOrder({
						orderData: {
							deliveryType: selecterDeliveryType
						},
						id
					});
				}}
				onCancel={() => navigate("/orders")}
			>
				<Radio.Group
					onChange={e => {
						setSelectedDeliveryType(e.target.value);
					}}
				>
					<Radio value="Доставка">Курьером</Radio>
					<Radio value="Самовывоз">Самовывоз</Radio>
				</Radio.Group>
			</Modal>
		);
	}

	const handleDeleteOrderConfirm = () => {
		try {
			deleteOrder(order.id);
			message.success("Заказ успешно отменен.");
			navigate("/orders");
		} catch (e) {
			message.error("Произошла ошибка при отмене заказа.");
		}
	};

	const getStepIndex = () => {
		if (!order || !order.status) return;
		switch (order.status) {
			case ORDER_STATUSES.UNKNOWN:
				return 0;
			case ORDER_STATUSES.WAITING_ANSWER:
				return 1;
			case ORDER_STATUSES.IN_WAY:
				return 2;
			case ORDER_STATUSES.ARRIVED:
				return 3;
			case ORDER_STATUSES.COMPLETED:
				return 4;
			default:
				return 0;
		}
	};

	return (
		<>
			<Row style={{ marginTop: "50px" }}>
				<Col span={24}>
					<BlockBackground>
						<div>
							<h1 style={{ textAlign: "center" }}>Заказ №{order.id}</h1>
							<Steps
								style={{ marginTop: "50px" }}
								current={getStepIndex()}
								items={[
									{
										title: ORDER_STATUSES.UNKNOWN,
										icon: <FrownOutlined />
									},
									{
										title: ORDER_STATUSES.WAITING_ANSWER,
										icon: <UserOutlined />
									},
									{
										title: ORDER_STATUSES.IN_WAY,
										icon: <CarOutlined />
									},
									{
										title: ORDER_STATUSES.ARRIVED.split(" ")[0],
										icon: <DropboxOutlined />
									},
									{
										title: ORDER_STATUSES.COMPLETED,
										icon: <SmileOutlined />
									}
								]}
							></Steps>
						</div>
					</BlockBackground>
				</Col>
			</Row>
			<Row style={{ marginTop: "50px" }}>
				<Col span={7}>
					<BlockBackground
						style={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between"
						}}
					>
						<div>
							<h2>Детали</h2>
							<p>Тип доставки: {order.deliveryType}</p>
							<p>Cтоимость: {order.price ? `${order.price} руб.` : "Нет"}</p>
							{order.promo ? <p>Промокод: {order.promo}</p> : null}
						</div>
						<DeleteOrderButton
							handleDeleteOrderConfirm={handleDeleteOrderConfirm}
						></DeleteOrderButton>
					</BlockBackground>
				</Col>
				<Col span={1}></Col>
				<Col span={16}>
					<BlockBackground style={{ height: "100%" }}>
						<h2>Товары</h2>
						{order.items.length === 0 ? (
							<Row>
								<Col span={12}>
									<p>Ваш штрих-код:</p>
								</Col>
								<Col span={12}>
									<IKImage style={{ maxWidth: "65%" }} src={order.qr} />
								</Col>
							</Row>
						) : (
							<div>
								{order.items.map((item, index) => (
									<div key={index}>
										<p>
											Ссылка:{" "}
											<a href={item.url} target="_blank" rel="noreferrer">
												{item.url.slice(0, 70) + "..."}
											</a>
										</p>
										<p>Количество: {item.count}</p>
										<p>Примечание: {item.note}</p>
										<Divider style={{ margin: 0 }} />
									</div>
								))}
							</div>
						)}
					</BlockBackground>
				</Col>
			</Row>
			<Row align={"middle"} justify={"center"} style={{ marginTop: "50px" }}>
				<Col span={16}>
					{order.status === ORDER_STATUSES.UNKNOWN && order.price === null ? (
						<>
							<BlockBackground>
								<Row align={"middle"} justify={"center"}>
									<Col span={14}>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												rowGap: "40px"
											}}
										>
											<div>
												<h2 style={{ fontSize: "32px", margin: "0" }}>
													Вы только создали заказ!
												</h2>
												<p
													style={{
														margin: "10px 0px 0px 0px",
														fontSize: "20px"
													}}
												>
													Ожидайте обратной связи администратора. Вам придет
													уведомление в Телеграм, если ваш профиль привязан к
													мессенджеру.
												</p>
											</div>
										</div>
									</Col>
									<Col span={10}>
										<div>
											<img
												style={{ maxWidth: "100%" }}
												src="/img/unknown-status.svg"
												alt="rate-us"
											/>
										</div>
									</Col>
								</Row>
							</BlockBackground>
						</>
					) : order.status === ORDER_STATUSES.WAITING_ANSWER &&
					  order.price !== null ? (
						<>
							<BlockBackground>
								<Row align={"middle"} justify={"center"}>
									<Col span={14}>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												rowGap: "40px"
											}}
										>
											<div>
												<h2 style={{ fontSize: "32px", margin: "0" }}>
													Администратор назначил стоимость вашего заказа
												</h2>
												<p
													style={{
														margin: "10px 0px 0px 0px",
														fontSize: "20px"
													}}
												>
													Стоимость: {order.price} руб. <br />
													Вы можете оплатить его или отменить.
												</p>
											</div>
											<div
												style={{
													display: "flex",
													columnGap: "20px"
												}}
											>
												<Button type="primary">
													Оплатить <DollarOutlined />
												</Button>
												<DeleteOrderButton
													handleDeleteOrderConfirm={handleDeleteOrderConfirm}
													type="default"
												></DeleteOrderButton>
											</div>
										</div>
									</Col>
									<Col span={10}>
										<div>
											<img
												style={{ maxWidth: "100%" }}
												src="/img/payment.svg"
												alt="rate-us"
											/>
										</div>
									</Col>
								</Row>
							</BlockBackground>
						</>
					) : order.status === ORDER_STATUSES.COMPLETED ? (
						<BlockBackground>
							<Row align={"middle"} justify={"center"}>
								<Col span={8}>
									<h2 style={{ fontSize: "32px" }}>Оцените заказ</h2>
									<Rate
										style={{ fontSize: "32px" }}
										allowClear
										onChange={rate => handleChangeRate(rate)}
										defaultValue={order.rate ? order.rate : null}
									></Rate>
								</Col>
								<Col span={4}></Col>
								<Col span={12}>
									<div>
										<img
											style={{ maxWidth: "100%" }}
											src="/img/rate-us.svg"
											alt="rate-us"
										/>
									</div>
								</Col>
							</Row>
						</BlockBackground>
					) : order.status === ORDER_STATUSES.IN_WAY ? (
						<BlockBackground>
							<Row align={"middle"} justify={"center"}>
								<Col span={14}>
									<div>
										<div>
											<h2 style={{ fontSize: "32px", margin: "0" }}>
												Ваш заказ в пути!
											</h2>
											<p
												style={{
													margin: "10px 0px 0px 0px",
													fontSize: "20px"
												}}
											>
												Совсем скоро он будет у вас
											</p>
										</div>
									</div>
								</Col>
								<Col span={10}>
									<div>
										<img
											style={{ maxWidth: "100%" }}
											src="/img/in-way-status.svg"
											alt="in-way"
										/>
									</div>
								</Col>
							</Row>
						</BlockBackground>
					) : order.status === ORDER_STATUSES.ARRIVED ? (
						<BlockBackground>
							<Row align={"middle"} justify={"center"}>
								<Col span={14}>
									<div>
										<div>
											<h2 style={{ fontSize: "32px", margin: "0" }}>
												Заказ прибыл!
											</h2>
											<p
												style={{
													margin: "10px 0px 0px 0px",
													fontSize: "20px"
												}}
											>
												Ваш заказ уже у нас. Вы можете забрать его или дождаться
												курьера.
											</p>
										</div>
									</div>
								</Col>
								<Col span={10}>
									<div>
										<img
											style={{ maxWidth: "100%" }}
											src="/img/arrived-status.svg"
											alt="in-way"
										/>
									</div>
								</Col>
							</Row>
						</BlockBackground>
					) : null}
				</Col>
			</Row>
		</>
	);
};

export default OrderDetails;

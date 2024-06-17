import { useEditOrderMutation } from "@/features/order/orderApiSlice";
import { useGetAllCouriersQuery } from "@/features/users/userApiSlice";
import {
	Button,
	Divider,
	Form,
	Input,
	InputNumber,
	Modal,
	Select,
	notification
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

import { ORDER_STATUSES } from "@/utils/OrderStatuses";

export const EditOrderModal = ({ selectedOrder, onCancel }) => {
	const [form] = useForm();
	const [editOrder] = useEditOrderMutation();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { data: couriers, isLoading: isCouriersLoading } =
		useGetAllCouriersQuery();

	const handleOrderSubmit = async (orderData, id) => {
		Object.keys(orderData).forEach(key => {
			if (orderData[key] === undefined) {
				orderData[key] = null;
			}
		});
		setIsSubmitting(true);
		try {
			await editOrder({ orderData, id }).unwrap();
			notification.success({
				message: "Успех",
				description: "Заказ отредактирован"
			});
		} catch (e) {
			console.error("Ошибка редактирования: ", e);
			notification.error({
				message: "Ошибка",
				description: "Произошла ошибка при редактировании."
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (selectedOrder) {
			form.setFieldsValue(selectedOrder);
			console.log(selectedOrder);
			// form.resetFields();
		}
	}, [selectedOrder, form]);

	if (isCouriersLoading) return <div>Загрузка...</div>;

	return (
		<Modal
			key={selectedOrder?.id}
			title={`Заказ №${selectedOrder?.id} - редактирование`}
			open={selectedOrder !== null}
			onCancel={onCancel}
			footer={null}
		>
			<div style={{ marginBottom: "20px" }}>
				{selectedOrder?.items.map((item, index) => (
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
			<Form
				form={form}
				layout="vertical"
				onFinish={orderData => {
					handleOrderSubmit(orderData, selectedOrder ? selectedOrder.id : null);
				}}
			>
				<Form.Item label="ID пользователя">
					<Input value={selectedOrder?.customer?.id} disabled />
				</Form.Item>
				<Form.Item label="Почта пользователя">
					<Input value={selectedOrder?.customer?.email} disabled />
				</Form.Item>
				<Form.Item label="Фамилия">
					<Input value={selectedOrder?.customer?.Profile?.surname} disabled />
				</Form.Item>
				<Form.Item label="Имя">
					<Input value={selectedOrder?.customer?.Profile?.name} disabled />
				</Form.Item>
				<Form.Item label="Отчество">
					<Input
						value={selectedOrder?.customer?.Profile?.patronymic}
						disabled
					/>
				</Form.Item>
				<Form.Item label="Дата создания заказа">
					<Input
						value={
							selectedOrder?.createdAt
								? new Date(selectedOrder.createdAt).toLocaleString()
								: ""
						}
						disabled
					/>
				</Form.Item>
				<Form.Item name={"deliveryType"} label="Тип доставки">
					<Input value={selectedOrder?.deliveryType} disabled />
				</Form.Item>
				{selectedOrder?.deliveryType === "Доставка" && (
					<Form.Item name={"courierId"} label="Курьер">
						<Select
							disabled={isCouriersLoading}
							value={selectedOrder?.courier_id}
							filterOption={(input, option) =>
								String(option.children)
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
							showSearch
						>
							{couriers?.map(courier => (
								<Select.Option key={courier.id} value={courier.id}>
									{courier.Profile?.surname || "Без имени"}{" "}
									{courier.Profile?.name || "Без имени"}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				)}
				<Form.Item label="Промокод">
					<Input
						disabled
						value={selectedOrder?.promoCode}
						onChange={event => (selectedOrder.promoCode = event.target.value)}
					/>
				</Form.Item>
				<Form.Item name={"price"} label="Цена">
					<InputNumber value={selectedOrder?.price} />
				</Form.Item>
				<Form.Item
					initialValue={selectedOrder?.status}
					name={"status"}
					label="Статус"
				>
					<Select
						options={Object.entries(ORDER_STATUSES).map(([_, label]) => ({
							value: label,
							label
						}))}
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" disabled={isSubmitting}>
						{"Сохранить"}
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

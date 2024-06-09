import { useGetAllOrdersQuery } from "@/features/order/orderApiSlice";
import {
	Button,
	DatePicker,
	Dropdown,
	Form,
	Input,
	Menu,
	Modal,
	Space,
	Table,
	Tooltip
} from "antd";
import s from "./Orders.module.scss";
import { StatusDescription } from "@/utils/StatusDescription/statusDescription";
import { DownOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import s_orderStatus from "@/utils/OrderStatus.module.scss";
import { useState } from "react";
import dayjs from "dayjs";
import { EditOrderModal } from "./EditOrderModal/EditOrderModal";
import { OrdersTable } from "./OrdersTable/OrdersTable";

export default function Orders() {
	const { data: orders, isLoading } = useGetAllOrdersQuery();
	const [dateRange, setDateRange] = useState(null);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const filteredOrders = dateRange
		? orders.filter(
				order =>
					dayjs(order.createAt).isAfter(dateRange[0]) &&
					dayjs(order.createAt).isBefore(dateRange[1])
		  )
		: orders;

	const handleDateChange = dates => {
		setDateRange(dates);
	};

	const handleClick = (e, record) => {
		if (e.key === "order-edit") {
			setSelectedOrder(record);
		}
	};

	if (isLoading) return <div>Загрузка...</div>;

	return (
		<>
			<div>
				<EditOrderModal
					selectedOrder={selectedOrder}
					onCancel={() => setSelectedOrder(null)}
				/>
				<DatePicker.RangePicker onChange={handleDateChange} />
				<OrdersTable orders={filteredOrders} handleClick={handleClick} />
			</div>
		</>
	);
}

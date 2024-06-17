import { EditOrderModal } from "./EditOrderModal/EditOrderModal";
import { OrdersTable } from "./OrdersTable/OrdersTable";
import { useGetAllOrdersQuery } from "@/features/order/orderApiSlice";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

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

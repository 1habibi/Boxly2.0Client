import { BarChart } from "@/copmonents/Charts/Bar";
import { DatePicker } from "antd";
import { useState } from "react";

const OrdersCountChart = ({ orders }) => {
	const [rangeDate, setRangeDate] = useState([]);

	const startDate =
		rangeDate.length > 0
			? new Date(rangeDate[0])
			: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
	const endDate =
		rangeDate.length > 0 ? new Date(rangeDate[1]) : new Date(Date.now());

	const daysInRange = [];
	for (
		let date = startDate;
		date <= endDate;
		date.setDate(date.getDate() + 1)
	) {
		daysInRange.push(new Date(date));
	}

	const ordersByDay = daysInRange.reduce((acc, currentDate) => {
		const dateKey = currentDate.toISOString().split("T")[0];
		acc[dateKey] = 0;
		return acc;
	}, {});

	orders.forEach(order => {
		const date = new Date(order.createdAt).toISOString().split("T")[0];
		ordersByDay[date]++;
	});

	const labels = daysInRange
		.map(date => date.toISOString().split("T")[0])
		.sort();
	const dataValues = Object.values(ordersByDay);

	const data = {
		labels,
		datasets: [
			{
				label: "Количество заказов в день",
				data: dataValues,
				backgroundColor: "#E56427"
			}
		]
	};

	return (
		<>
			<DatePicker.RangePicker
				style={{ marginBottom: "20px" }}
				onChange={values => {
					const dates = values.map(date => date.toISOString().split("T")[0]);
					setRangeDate(dates);
				}}
			></DatePicker.RangePicker>
			<BarChart
				title={"Количество заказов"}
				data={data}
				options={{
					scales: {
						y: {
							beginAtZero: true,
							ticks: {
								stepSize: 1,
								callback: value => value.toFixed(0)
							}
						}
					}
				}}
			></BarChart>
		</>
	);
};

export default OrdersCountChart;

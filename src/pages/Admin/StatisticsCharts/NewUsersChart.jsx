import { LineGraph } from "@/copmonents/Charts/Line";
import { DatePicker } from "antd";
import { useState } from "react";

const NewUsersChart = ({ users }) => {
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

	const registrationsByDay = daysInRange.reduce((acc, currentDate) => {
		const dateKey = currentDate.toISOString().split("T")[0];
		acc[dateKey] = 0;
		return acc;
	}, {});

	users.forEach(user => {
		const date = new Date(user.createdAt).toISOString().split("T")[0];
		registrationsByDay[date]++;
	});

	const labels = daysInRange
		.map(date => date.toISOString().split("T")[0])
		.sort();
	const dataValues = Object.values(registrationsByDay);

	const data = {
		labels,
		datasets: [
			{
				label: "Количество регистраций",
				data: dataValues,
				borderColor: "#E56427"
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
			<LineGraph
				title={"Количество регистраций"}
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
			/>
		</>
	);
};

export default NewUsersChart;

import { PieChart } from "@/copmonents/Charts/Pie";

const OrdersRatingChart = ({ orders }) => {
	const labels = [1, 2, 3, 4, 5];

	const dataValues = orders.reduce((acc, order) => {
		if (order.rate >= 1 && order.rate <= 5) {
			acc[order.rate - 1] = (acc[order.rate - 1] || 0) + 1;
		}
		return acc;
	}, Array(5).fill(0));

	console.log(dataValues);

	const data = {
		labels,
		datasets: [
			{
				label: "Количество",
				data: dataValues,
				backgroundColor: ["#ae2012", "#bb3e03", "#e9d8a6", "#0a9396", "#06d6a0"]
			}
		]
	};

	return (
		<>
			<PieChart data={data} title={"Оценки заказов"} />
		</>
	);
};

export default OrdersRatingChart;

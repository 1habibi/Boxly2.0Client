import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, ArcElement);

export const PieChart = ({ data, options = {}, title }) => {
	const defaultOptions = {
		animation: {
			duration: 1000,
			easing: "easeInOutQuart"
		},
		plugins: {
			title: {
				display: true,
				text: title
			},
			legend: {
				display: true,
				position: "bottom"
			}
		}
	};

	const mergedOptions = { ...defaultOptions, ...options };

	return <Pie options={mergedOptions} data={data}></Pie>;
};

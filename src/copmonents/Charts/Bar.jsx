import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const BarChart = ({ data, options = {}, title }) => {
	const defaultOptions = {
		animation: {
			duration: 1000,
			easing: "easeInOutQuart"
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1,
					callback: value => value.toFixed(0)
				}
			}
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

	return <Bar options={mergedOptions} data={data}></Bar>;
};

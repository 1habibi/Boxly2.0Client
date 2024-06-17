import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const LineGraph = ({ data, options = {}, title }) => {
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

	return <Line options={mergedOptions} data={data} />;
};

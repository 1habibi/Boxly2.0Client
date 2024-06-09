import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from "chart.js";

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

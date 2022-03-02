import { useState } from 'react';
import { Line } from 'react-chartjs-2';
// Chart needs to be imported for react-chartjs-2 to work
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = ({ chartData, labelsKey, datasetsKey }) => {
	const [lineChartData] = useState({
		labels: chartData.map((data) => data[`${labelsKey}`]),
		datasets: [{ data: chartData.map((data) => data[`${datasetsKey}`]) }],
	});

	const options = {
		borderColor: '#2151f5',
		borderWidth: 2,
		animation: {
			duration: 0,
		},
		responsive: true,
		scales: {
			x: {
				display: false,
				grid: {
					display: false,
				},
			},
			y: {
				display: false,
			},
		},
		elements: {
			point: {
				radius: 0,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
		},
	};

	return <Line data={lineChartData} options={options} />;
};

export default LineChart;
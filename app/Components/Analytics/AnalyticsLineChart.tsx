import {PintEntry} from "@/app/Common/BeerCommon";

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {getLabelsAndData} from "@/app/Common/ChartCommon";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Pints demolished',
        },
    },
};

interface AnalyticsChartProps {
    weeklyPintHistory: PintEntry[];
}


export function AnalyticsLineChart({weeklyPintHistory}: AnalyticsChartProps) {
    const {labels, data,} = getLabelsAndData(weeklyPintHistory);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Pints demolished',
                data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Line options={options} data={chartData}/>;
}
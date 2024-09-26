import {PintEntry} from "@/app/Common/BeerCommon";

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {Bar} from 'react-chartjs-2';
import {getLabelsAndData} from "@/app/Common/ChartCommon";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface AnalyticsChartProps {
    weeklyPintHistory: PintEntry[];
}

export function AnalyticsBarChart({weeklyPintHistory}: AnalyticsChartProps) {
    const {labels, data} = getLabelsAndData(weeklyPintHistory);

    const chartOptions = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
        maintainAspectRatio: false
    };

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

    return (
        <div className={'min-h-full'}>
            {/*@ts-ignore*/}
            <Bar options={chartOptions} data={chartData}/>
        </div>
    );
}
import {PintEntry} from "@/app/Common/BeerCommon";

{/* Chart component for a users weekly pint consumption. Usage: <AnalyticsChart weeklyPintHistory={pintsLastWeek}/>*/
}

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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
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

function getDayOfWeek(d: Date): string {
    return d.toLocaleDateString('en-GB', {weekday: 'long'});
}

function getLabelsAndData(pintEntries: PintEntry[]) {
    const labels: string[] = [];
    const data: number[] = new Array(7).fill(0);
    const today = new Date();
    const lastWeekDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);

    // Create labels for the past 7 days as days of the week
    for (let i = 0; i < 7; i++) {
        const date = new Date(lastWeekDate.getFullYear(), lastWeekDate.getMonth(), lastWeekDate.getDate() + i);
        labels.push(getDayOfWeek(date)); // Get the day of the week
    }

    pintEntries.forEach(entry => {
        const entryDayOfWeek = getDayOfWeek(entry.timestamp);
        const index = labels.indexOf(entryDayOfWeek);
        if (index !== -1) {
            data[index]++;
        }
    });

    return {labels, data};
}

export function AnalyticsChart({weeklyPintHistory}: AnalyticsChartProps) {
    const {labels, data} = getLabelsAndData(weeklyPintHistory);

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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Pint Consumption Over the Last Week'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day of the Week'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Pints'
                },
                beginAtZero: true
            }
        }
    };

    // @ts-ignore
    return <Line options={options} data={chartData}/>;
}
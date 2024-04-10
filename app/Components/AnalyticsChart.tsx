{/* Chart component for a users weekly pint consumption. Usage: <AnalyticsChart weeklyPintHistory={pintsLastWeek}/>*/}

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
import { Line } from 'react-chartjs-2';

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

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday 🤙', 'Sunday'];

interface AnalyticsChartProps {
    weeklyPintHistory: Object;
}

export function AnalyticsChart(props : AnalyticsChartProps) {
    const data = {
        labels,
        datasets: [
          {
            label: 'Pints demolished',
            data: props.weeklyPintHistory,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
  return <Line options={options} data={data} />;
}

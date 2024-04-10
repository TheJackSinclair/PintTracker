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

function getLabelsForWeek(dayIndex: number) {
  const baseLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = dayIndex; // In JavaScript, 0 is Sunday, 1 is Monday, etc.
  const labels = [];

  for (let i = 1; i <= 7; i++) {
    const labelIndex = (todayIndex + i) % 7;
    labels.push(baseLabels[labelIndex]);
  }

  const saturdayIndex = (todayIndex + 6) % 7;
  labels[saturdayIndex] = labels[saturdayIndex] + ' 🤙';

  return labels;
}


interface AnalyticsChartProps {
    weeklyPintHistory: Object;
}

export function AnalyticsChart(props : AnalyticsChartProps) {
  const today = new Date().getDay(); // get the current day index
  const reorderedLabels = getLabelsForWeek(today);

  const data = {
    labels: reorderedLabels, // use the reordered labels here
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

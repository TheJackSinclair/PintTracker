import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AnalyticsChart } from "@/app/Components/AnalyticsChart";

export default {
  title: 'Components/AnalyticsChart',
  component: AnalyticsChart,
} as Meta;

const generatePintData = () => {
  return Array.from({ length: 7 }, () => Math.floor(Math.random() * 10));
};

const Template: StoryFn<{ weeklyPintHistory: number[] }> = (args) => <AnalyticsChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  weeklyPintHistory: generatePintData(),
};

export const HighConsumption = Template.bind({});
HighConsumption.args = {
  weeklyPintHistory: [10, 15, 20, 25, 18, 23, 12],
};

export const LowConsumption = Template.bind({});
LowConsumption.args = {
  weeklyPintHistory: [1, 0, 2, 1, 1, 3, 0],
};

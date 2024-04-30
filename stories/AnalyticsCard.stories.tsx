import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AnalyticsCard from "@/app/Components/AnalyticsCard";

export default {
  title: 'Components/AnalyticsCard',
  component: AnalyticsCard,
} as Meta;

const Template: StoryFn<{ children: React.ReactNode }> = (args) => <AnalyticsCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div>Sample content</div>,
};

export const WithMultipleChildren = Template.bind({});
WithMultipleChildren.args = {
  children: (
    <>
      <div>First Child</div>
      <div>Second Child</div>
      <div>Third Child</div>
    </>
  ),
};

export const WithComplexContent = Template.bind({});
WithComplexContent.args = {
  children: (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Heading</h1>
      <p>Text</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Click me</button>
    </div>
  ),
};

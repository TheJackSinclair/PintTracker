import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { LeaderboardPanel } from "@/app/Components/LeaderboardPanel";

export default {
  title: 'Components/LeaderboardPanel',
  component: LeaderboardPanel,
  argTypes: {
    width: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extralarge']
    },
    shadow: {
      control: 'select',
      options: ['yellow', 'orange']
    },
    blur: {
      control: 'boolean'
    },
    onTabClick: { action: 'Tab Clicked' }
  }
} as Meta;

const Template: StoryFn<{
  children: React.ReactNode,
  width: 'small' | 'medium' | 'large' | 'extralarge',
  shadow: 'yellow' | 'orange',
  blur?: boolean,
  onTabClick: (tab: string) => void
}> = (args) => <LeaderboardPanel {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div style={{ padding: '20px' }}>Content based on selected tab appears here.</div>,
  width: 'large',
  shadow: 'yellow',
  blur: false,
  onTabClick: (tab) => console.log(`Tab selected: ${tab}`),
};
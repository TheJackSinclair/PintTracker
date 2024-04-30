import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Panel } from "@/app/Components/Panel";

export default {
  title: 'Components/Panel',
  component: Panel,
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
    centered: {
      control: 'boolean'
    }
  }
} as Meta;

const Template: StoryFn<{
  children: React.ReactNode,
  width: 'small' | 'medium' | 'large' | 'extralarge',
  shadow: 'yellow' | 'orange',
  blur?: boolean,
  centered?: boolean
}> = (args) => <Panel {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div style={{ padding: '20px' }}>Content</div>,
  width: 'medium',
  shadow: 'yellow',
  blur: false,
  centered: false
};
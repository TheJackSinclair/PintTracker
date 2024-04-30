import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NavBar } from "@/app/Components/Navbar";

export default {
  title: 'Components/NavBar',
  component: NavBar,
} as Meta;

const Template: StoryFn = (args) => <NavBar {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.decorators = [
  (Story) => {
    localStorage.setItem('pint_token', 'mockToken');
    return <Story />;
  },
];

export const LoggedOut = Template.bind({});
LoggedOut.decorators = [
  (Story) => {
    localStorage.removeItem('pint_token');
    return <Story />;
  },
];

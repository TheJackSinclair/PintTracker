import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import BeerGlass from "@/app/Components/BeerGlass";

export default {
  title: 'Components/BeerGlass',
  component: BeerGlass,
} as Meta;

const Template: StoryFn = () => <BeerGlass />;

export const Default = Template.bind({});

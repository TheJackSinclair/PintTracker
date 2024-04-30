import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Carousel from "@/app/Components/Carousel";
export default {
  title: 'Components/Carousel',
  component: Carousel,
} as Meta;

const Template: StoryFn<{ children: React.ReactNode }> = (args) => <Carousel {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div style={{ width: '300px', height: '200px', backgroundColor: 'lavender', textAlign: 'center', lineHeight: '200px' }}>wasup playa</div>,
};

export const WithMultipleSlides = Template.bind({});
WithMultipleSlides.args = {
  children: [
    <div key="slide1" style={{ width: '300px', height: '200px', backgroundColor: 'coral', textAlign: 'center', lineHeight: '200px' }}>Slide 1</div>,
    <div key="slide2" style={{ width: '300px', height: '200px', backgroundColor: 'aquamarine', textAlign: 'center', lineHeight: '200px' }}>Slide 2</div>,
    <div key="slide3" style={{ width: '300px', height: '200px', backgroundColor: 'orchid', textAlign: 'center', lineHeight: '200px' }}>Slide 3</div>,
  ],
};

export const WithUsername = Template.bind({});
WithUsername.decorators = [
  (Story) => {
    localStorage.setItem('username', 'StoryUser');
    return <Story />;
  },
];
WithUsername.args = {
    children: <div style={{ width: '300px', height: '200px', backgroundColor: 'lightblue', textAlign: 'center', lineHeight: '200px' }}>Hello, StoryUser</div>,
  };

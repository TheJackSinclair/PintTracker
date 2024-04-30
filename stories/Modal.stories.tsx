import { StoryObj, Meta } from "@storybook/react";
import { Modal, modalProps } from "@/app/Components/Modal";

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: { onClose: { action: 'closed' } },
} as Meta<typeof Modal>;

const Template: StoryObj<modalProps> = {
  args: {
    children: 'This is a modal.',
    width: 'medium',
    onClose: () => {},
  },
};

export const Small: StoryObj<modalProps> = {
  ...Template,
  args: {
    ...Template.args,
    width: 'small',
    children: 'This is a small modal.'
  },
};

export const Medium: StoryObj<modalProps> = {
  ...Template,
  args: {
    ...Template.args,
    width: 'medium',
    children: 'This is a medium modal.'
  },
};

export const Large: StoryObj<modalProps> = {
  ...Template,
  args: {
    ...Template.args,
    width: 'large',
    children: 'This is a large modal.'
  },
};

export const ExtraLarge: StoryObj<modalProps> = {
  ...Template,
  args: {
    ...Template.args,
    width: 'extralarge',
    children: 'This is an extra large modal.'
  },
};

import { StoryObj, Meta } from "@storybook/react";
import { Button, buttonProps } from "@/app/Components/Button";

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: { onClose: { action: 'closed' } },
} as Meta<typeof Button>;

const Template: StoryObj<buttonProps> = {
  args: {
    children: 'This is a button.',
    handleClick: () => {},
  },
};

export const Default: StoryObj<buttonProps> = {
    ...Template,
    args: {
      ...Template.args,
    },
  }
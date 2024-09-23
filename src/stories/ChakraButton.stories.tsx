import { Button } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof Button> = {
  title: "Chakra Button",
  component: Button,
  args: {
    children: "Hello World",
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Button>;
export const Normal: Story = {};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

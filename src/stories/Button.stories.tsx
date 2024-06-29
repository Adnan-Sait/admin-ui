import type { Meta, StoryObj } from "@storybook/react";
import Button from "../ui/Button/Button";
import { fn } from "@storybook/test";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: { type: { type: "string" } },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Hello World",
    onClick: fn(),
  },
};

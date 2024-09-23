import type { Meta, StoryObj } from "@storybook/react";
import Button from "../ui/Button/Button";
import { fn } from "@storybook/test";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  args: {
    children: "Hello World",
  },
  argTypes: {
    type: {
      control: "radio",
      type: "string",
      options: ["submit", "reset", "button"],
    },
  },
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

export const ClickLog: Story = {
  args: {
    onClick: () => console.log("Hello World"),
  },
};

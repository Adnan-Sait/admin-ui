import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Progress from "../ui/Progress/Progress";

const meta: Meta<typeof Progress> = {
  title: "Progress",
  component: Progress,
  argTypes: {
    type: { options: ["increment", "decrement"], control: { type: "radio" } },
  },
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Increment: Story = {
  args: {
    max: 3000,
    type: "increment",
    onComplete: fn(),
  },
};

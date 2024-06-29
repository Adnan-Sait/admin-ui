import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Pagination from "../components/pagination/Pagination";

function PaginationWrapper(props: Parameters<typeof Pagination>[0]) {
  const [activePage, setActivePage] = useState(1);

  return (
    <Pagination
      {...props}
      activePage={activePage}
      setActivePage={setActivePage}
    />
  );
}

const meta: Meta<typeof Pagination> = {
  title: "Pagination",
  component: Pagination,
  args: {
    setActivePage: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Normal: Story = {
  args: {
    itemsPerPage: 10,
    totalCount: 50,
  },
};

export const ActivePage: Story = {
  args: {
    itemsPerPage: 10,
    totalCount: 50,
    activePage: 2,
  },
};

export const LessThanOne: Story = {
  args: {
    itemsPerPage: 10,
    totalCount: 5,
    activePage: 1,
  },
};

export const ManyPages: Story = {
  args: {
    itemsPerPage: 10,
    totalCount: 500,
    activePage: 1,
  },
};

export const Page: Story = {
  name: "Page Change",
  render: (props: Parameters<typeof Pagination>[0]) => (
    <PaginationWrapper {...props} />
  ),
  args: {
    itemsPerPage: 10,
    totalCount: 50,
  },
};

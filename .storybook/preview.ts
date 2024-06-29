import type { Preview } from "@storybook/react";
import "../src/utilities.css";
import "../src/index.css";
import "../src/theme.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

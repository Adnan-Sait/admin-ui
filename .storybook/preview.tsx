import React from "react";
import type { Preview } from "@storybook/react";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { withConsole } from "@storybook/addon-console";
import { withKnobs } from "@storybook/addon-knobs";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import "../src/utilities.css";
import "../src/index.css";
import "../src/theme.css";

const chakraConfig: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
const theme = extendTheme({ config: chakraConfig });

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  decorators: [
    (story) => (
      <ChakraProvider theme={theme}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {story()}
        </div>
      </ChakraProvider>
    ),
    (story, context) => withConsole()(story)(context),
    withKnobs,
  ],
};

export default preview;

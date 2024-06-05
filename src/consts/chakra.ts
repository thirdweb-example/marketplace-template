import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const chakraThemeConfig: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const chakraTheme = extendTheme({
  config: chakraThemeConfig,

  /**
   * Hard-coding some default style to "white"
   * TODO: change to dynamic theming
   */
  components: {
    Text: {
      baseStyle: (props: any) => ({
        color: "white",
      }),
    },
    Heading: {
      baseStyle: (props: any) => ({
        color: "white",
      }),
    },
    Tr: {
      baseStyle: (props: any) => ({
        color: "white",
      }),
    },
  },
});

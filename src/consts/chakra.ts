import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const chakraThemeConfig: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const chakraTheme = extendTheme({
  config: chakraThemeConfig,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("white", "gray.800")(props),
        color: mode("gray.800", "white")(props),
      },
    }),
  },
  components: {
    Text: {
      baseStyle: (props: any) => ({
        color: mode("black", "white")(props),
      }),
    },
  },
});

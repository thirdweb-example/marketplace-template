import { extendTheme } from "@chakra-ui/react";

export const chakraThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  components: {
    // Accordion: {
    // 	baseStyle: {
    // 		container: {
    // 			border: "none",
    // 		},
    // 		button: {
    // 			// borderTop: "1px solid rgba(255,255,255,0.5)",
    // 			borderBottom: "1px solid rgba(255,255,255,0.5)",
    // 		},
    // 	},
    // },
  },
};
export const chakraTheme = extendTheme(chakraThemeConfig);

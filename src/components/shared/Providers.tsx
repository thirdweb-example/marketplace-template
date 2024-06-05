"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        color: props.colorMode === "dark" ? "white" : "gray.800",
      },
    }),
  },
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
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ThirdwebProvider>{children}</ThirdwebProvider>
    </ChakraProvider>
  );
}

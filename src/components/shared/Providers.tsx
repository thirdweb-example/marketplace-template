"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";

const theme = extendTheme({
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

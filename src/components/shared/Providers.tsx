"use client";
import { chakraTheme } from "@/consts/chakra";
import { ChakraProvider } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ThirdwebProvider>{children}</ThirdwebProvider>
    </ChakraProvider>
  );
}

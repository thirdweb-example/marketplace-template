"use client";
import { chakraTheme } from "@/consts/chakra";
import EnsProvider from "@/hooks/useENSContext";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider>
          <EnsProvider>{children}</EnsProvider>
        </ThirdwebProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

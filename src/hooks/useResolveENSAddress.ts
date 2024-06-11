import { client } from "@/consts/client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { resolveAddress } from "thirdweb/extensions/ens";

// Get ENS name from a wallet address
export function useResolveENSAddress({
  text,
  enabled,
}: {
  text: string;
  enabled: boolean;
}) {
  return useQuery(
    queryOptions({
      queryKey: ["ensText", text || "ensText"] as const,
      queryFn: async () => {
        if (!client) {
          throw new Error("client is required");
        }
        return resolveAddress({ client, name: text });
      },
      enabled,
    })
  );
}

import { client } from "@/consts/client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { resolveAvatar, resolveName } from "thirdweb/extensions/ens";

// Get ENS name from a wallet address
export function useGetENSAvatar({
  ensName,
}: {
  ensName: string | undefined | null;
}) {
  return useQuery(
    queryOptions({
      queryKey: ["ensAvatar", ensName || "n/a"] as const,
      queryFn: async () => {
        if (!client) {
          throw new Error("client is required");
        }
        if (!ensName) return;
        return resolveAvatar({ client, name: ensName });
      },
      enabled: !!ensName,
    })
  );
}

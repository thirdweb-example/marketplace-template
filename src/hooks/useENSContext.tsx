import { client } from "@/consts/client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { resolveAvatar, resolveName } from "thirdweb/extensions/ens";
import { useActiveAccount } from "thirdweb/react";
import { type Account } from "thirdweb/wallets";

type EnsContextType = {
  account: Account | undefined;
  ensName: string | null | undefined;
  ensAvatar: string | null | undefined;
};

const EnsContext = createContext<EnsContextType | undefined>(undefined);

export default function EnsProvider({ children }: { children: ReactNode }) {
  const account = useActiveAccount();
  const address = account?.address || "";
  const { data: ensName } = useQuery(
    queryOptions({
      queryKey: ["ensName", address || "0x0"] as const,
      queryFn: async () => {
        if (!client) {
          throw new Error("client is required");
        }
        if (!address) return;
        return resolveName({ client, address });
      },
      enabled: !!address,
    })
  );

  const { data: ensAvatar } = useQuery(
    queryOptions({
      queryKey: ["ensAvatar", address || "0x0"] as const,
      queryFn: async () => {
        if (!client) {
          throw new Error("client is required");
        }
        if (!address) return;
        if (!ensName) return;
        return resolveAvatar({ client, name: ensName });
      },
      enabled: !!ensName,
    })
  );

  return (
    <EnsContext.Provider value={{ ensAvatar, ensName, account }}>
      {children}
    </EnsContext.Provider>
  );
}

export function useENSContext() {
  const context = useContext(EnsContext);
  if (context === undefined) {
    throw new Error("useENSContext must be used inside EnsProvider");
  }
  return context;
}

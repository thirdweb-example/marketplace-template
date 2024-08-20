import type { Chain } from "thirdweb";
import { vitruveo } from "./chains";

type MarketplaceContract = {
  address: string;
  chain: Chain;
};

/**
 * You need a marketplace contract on each of the chain you want to support
 * Only list one marketplace contract address for each chain
 */
export const MARKETPLACE_CONTRACTS: MarketplaceContract[] = [
  {
    address: "0x640A5d04768F762FCe0fC66e9A2e1ecf1BfCB8fB",
    chain: vitruveo,
  },
];

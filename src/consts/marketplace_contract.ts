import type { Chain } from "thirdweb";
import { avalancheFuji, polygonAmoy, sepolia } from "./chains";

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
    address: "0x8C1D464B385A2B7EAa80dcAAD66DD8BC0256e717",
    chain: avalancheFuji,
  },
  {
    address: "0xAD9Cd3Fcb23b918e19726b0Df7078e46e5FF81b8",
    chain: polygonAmoy,
  },
  {
    address: "0xe0eFD6fb388405b67b3E9FaFc02649c70E749f03",
    chain: sepolia,
  },
];

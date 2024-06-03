import type { Chain } from "thirdweb";
import { avalancheFuji } from "./chains";

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
		chain: avalancheFuji, // AVAX Fuji
	},
];

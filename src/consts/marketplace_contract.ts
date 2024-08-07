import type { Chain } from "thirdweb";
import {  yourCustomChain } from "./chains";

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
    address: "0x952e803BB045A4Cf9CDbE9AB1281B065fd07Eb76",
    chain: yourCustomChain,
  },
 

];

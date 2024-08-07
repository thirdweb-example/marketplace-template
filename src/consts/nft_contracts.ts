import type { Chain } from "thirdweb";
import { yourCustomChain } from "./chains";

export type NftContract = {
  address: string;
  chain: Chain;
  type: "ERC1155" | "ERC721";

  title?: string;
  description?: string;
  thumbnailUrl?: string;
  slug?: string;
};

/**
 * Below is a list of all NFT contracts supported by your marketplace(s)
 * This is of course hard-coded for demo purpose
 *
 * In reality, the list should be dynamically fetched from your own data source
 */
export const NFT_CONTRACTS: NftContract[] = [
  {
    address: "0xe2Bc16894eeedE77915faA297047A08a5073C55C",
    chain: yourCustomChain,
    title: "Test Collection",
    thumbnailUrl:
      "https://d391b93f5f62d9c15f67142e43841acc.ipfscdn.io/ipfs/bafybeichanaklyw6ogjtxtnh4yums4bjflbzvlnnrtorlrl4gddrakpnia/download%20(16).png",
    type: "ERC721",
  },
 
 
];

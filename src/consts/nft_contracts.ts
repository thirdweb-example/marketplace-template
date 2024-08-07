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
  {
    address:"0xccf0dF476C15f7e9e554d8d549cF8ccc34512afF",
    chain:yourCustomChain,
    title:"Random Collection",
    thumbnailUrl:"https://d391b93f5f62d9c15f67142e43841acc.ipfscdn.io/ipfs/bafybeigx3ybgrpriickkb4memqtr27zgl52p6k6fpbzaasxzgnpvh5tfmi/southernfried.nfts_two_sheep_with_afro_hair_sitting_on_the_gras_fa1ac42a-cb61-4b5a-a65b-ee7dfac33282.png",
    type:"ERC721",
  },
 
 
];

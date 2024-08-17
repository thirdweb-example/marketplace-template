import type { Chain } from "thirdweb";
import { yourCustomChain } from "./chains";

export type NftContract = {
  address: string;
  chain: Chain;
  type: "ERC1155" | "ERC721";
  thumbnailUrl: string;
  title?: string;
  description?: string;
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
    address: "0x789825ddaA3C41ef2876B6F152996681B6242253",
    chain: yourCustomChain,
    title: "The National Fentanyl Awareness Day Charity 2024",
    type: "ERC721",
    thumbnailUrl: "",
  },


];

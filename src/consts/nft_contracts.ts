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
    address: "0xe2Bc16894eeedE77915faA297047A08a5073C55C",
    chain: yourCustomChain,
    title: "Test Collection",
    type: "ERC721",
    thumbnailUrl: "https://d391b93f5f62d9c15f67142e43841acc.ipfscdn.io/ipfs/bafybeibi3tixmpxqmua2iq4mvf2cgb44nbrmxkfqmqq4bzbi2ujj23dywy/download%20(12).png",
  },
  {
    address:"0xccf0dF476C15f7e9e554d8d549cF8ccc34512afF",
    chain:yourCustomChain,
    title:"Random Collection",
    type:"ERC721",
    thumbnailUrl:"https://d391b93f5f62d9c15f67142e43841acc.ipfscdn.io/ipfs/bafybeigjuhtnce4adh3srfqzbjxfeqqsm4p67ai25xszbztqkeen45h2rq/SFRIED_token.png",
  },
  {
    address:"0x72a7De5e5678126A1Cb42cC86052b00027D933ae",
    chain:yourCustomChain,
    title:"my collection",
    type:"ERC721",
    thumbnailUrl:"",
  },
 
 
];

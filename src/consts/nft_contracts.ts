import type { Chain } from "thirdweb";
import { avalancheFuji } from "./chains";

export type NftContract = {
	address: string;
	chain: Chain;
	type: "ERC1155" | "ERC721";

	title?: string;
	description?: string;
	thumbnailUrl?: string;
	slug?: string;
};

export const NFT_CONTRACTS: NftContract[] = [
	{
		address: "0x0896Db00D8987Fba2152aa7c14c4255eBC7354cE",
		chain: avalancheFuji,
		title: "Unnamed Collection",
		description: "",
		thumbnailUrl:
			"https://258c828e8cc853bf5e0efd001055fb39.ipfscdn.io/ipfs/Qmct2vS78Uwug3zVtqQognskPPRmd4wRQiaDAQWt1kRJws/0.png",
		slug: "unnamed-collection",
		type: "ERC721",
	},
	{
		address: "0x0ACaCa3d3F64bb6e6D3564BBc891c58Bd4A4c83c",
		chain: avalancheFuji,
		title: "GoroBot",
		thumbnailUrl:
			"https://258c828e8cc853bf5e0efd001055fb39.ipfscdn.io/ipfs/bafybeiay3ffxy3os56bvnu5cmq7gids4v6n4hf5nvvcb3gy2dzavi3ltnu/profile.jpg",
		slug: "gorobot",
		type: "ERC721",
	},
];

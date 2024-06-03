"use client";

import { Collection } from "@/components/collection-page/Collection";
import { client } from "@/consts/client";
import { MARKETPLACE_CONTRACTS } from "@/consts/marketplace_contract";
import { NFT_CONTRACTS } from "@/consts/nft_contracts";
import { defineChain, getContract } from "thirdweb";
import { isERC1155 } from "thirdweb/extensions/erc1155";
import { isERC721 } from "thirdweb/extensions/erc721";
import { useReadContract } from "thirdweb/react";

export default function CollectionPage({
	params,
}: { params: { contractAddress: string; chainId: string } }) {
	const chain = defineChain(Number(params.chainId));
	const marketplaceContract = MARKETPLACE_CONTRACTS.find(
		(item) => item.chain.id === chain.id,
	);
	if (!marketplaceContract) {
		throw new Error("Marketplace not supported on this chain");
	}

	const collectionSupported = NFT_CONTRACTS.find(
		(item) =>
			item.address.toLowerCase() === params.contractAddress.toLowerCase() &&
			item.chain.id === chain.id,
	);
	// You can remove this condition if you want to supported _any_ nft collection
	// or you can update the entries in `NFT_CONTRACTS`
	if (!collectionSupported) {
		throw new Error("Contract not supported on this marketplace");
	}

	const contract = getContract({
		chain: collectionSupported.chain,
		client,
		address: params.contractAddress,
	});
	const { data: is721, isLoading: isChecking721 } = useReadContract(isERC721, {
		contract,
	});
	const { data: is1155, isLoading: isChecking1155 } = useReadContract(
		isERC1155,
		{ contract },
	);
	const isLoading = isChecking1155 || isChecking721;
	if (isLoading) return <div>Loading...</div>;
	const isNftCollection = is1155 || is721;
	if (!isNftCollection) throw new Error("Not a valid NFT collection");
	const marketplace = getContract({
		address: marketplaceContract.address,
		chain: marketplaceContract.chain,
		client,
	});
	return (
		<Collection
			type={is1155 ? "ERC1155" : "ERC721"}
			nftCollection={contract}
			marketplaceContract={marketplace}
		/>
	);
}

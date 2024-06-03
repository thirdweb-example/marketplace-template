"use client";

import { Token } from "@/components/token-page/Token";
import { client } from "@/consts/client";
import { MARKETPLACE_CONTRACTS } from "@/consts/marketplace_contract";
import { NFT_CONTRACTS } from "@/consts/nft_contracts";
import { defineChain } from "thirdweb";
import { getContract } from "thirdweb/contract";
import { isERC1155 } from "thirdweb/extensions/erc1155";
import { isERC721 } from "thirdweb/extensions/erc721";
import { useReadContract } from "thirdweb/react";

export default function ListingPage({
	params,
}: {
	params: { contractAddress: string; chainId: string; tokenId: string };
}) {
	const { contractAddress, chainId, tokenId } = params;
	if (!tokenId) {
		throw new Error("Missing listingId");
	}
	const chain = defineChain(Number(chainId));
	const marketplaceContract = MARKETPLACE_CONTRACTS.find(
		(item) => item.chain.id === chain.id,
	);
	if (!marketplaceContract) {
		throw new Error("Marketplace not supported on this chain");
	}

	const collectionSupported = NFT_CONTRACTS.find(
		(item) =>
			item.address.toLowerCase() === contractAddress.toLowerCase() &&
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
		address: contractAddress,
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
		<Token
			nftCollection={contract}
			marketplaceContract={marketplace}
			tokenId={BigInt(tokenId)}
			type={is1155 ? "ERC1155" : "ERC721"}
		/>
	);
}

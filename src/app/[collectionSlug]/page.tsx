/**
 * This is the slug page. It behaves exactly like /collection/[chainId]/[contractAddress]
 * however the url is nicer your-marketplace.com/<collection-slug>
 */

import { NFT_CONTRACTS } from "@/consts/nft_contracts";
import CollectionPage from "../collection/[chainId]/[contractAddress]/page";

export default function CollectionSlugPage({
	params,
}: { params: { collectionSlug: string } }) {
	const foundContract = NFT_CONTRACTS.find(
		(item) => item.slug === params.collectionSlug,
	);
	if (!foundContract) {
		throw new Error("Collection not found");
	}
	const chainId = String(foundContract.chain.id);
	const contractAddress = foundContract.address;
	return <CollectionPage params={{ chainId, contractAddress }} />;
}

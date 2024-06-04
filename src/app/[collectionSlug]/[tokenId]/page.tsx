import ListingPage from "@/app/collection/[chainId]/[contractAddress]/token/[tokenId]/page";
import { NFT_CONTRACTS } from "@/consts/nft_contracts";

/**
 * This is the slug page. It behaves exactly like /collection/[chainId]/[contractAddress]/token/[tokenId]
 * however the url is nicer your-marketplace.com/<collection-slug>/<tokenId>
 */

export default function CollectionSlugPage({
	params,
}: { params: { collectionSlug: string; tokenId: string } }) {
	const foundContract = NFT_CONTRACTS.find(
		(item) => item.slug === params.collectionSlug,
	);
	if (!foundContract) {
		throw new Error("Collection not found");
	}
	const chainId = String(foundContract.chain.id);
	const contractAddress = foundContract.address;
	return (
		<ListingPage
			params={{ chainId, contractAddress, tokenId: params.tokenId }}
		/>
	);
}

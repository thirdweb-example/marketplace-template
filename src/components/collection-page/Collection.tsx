import type { ThirdwebContract } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { MediaRenderer, useReadContract } from "thirdweb/react";
import { getNFT as getNFT721 } from "thirdweb/extensions/erc721";
import { getNFT as getNFT1155 } from "thirdweb/extensions/erc1155";
import { client } from "@/consts/client";
import { Box, Flex, Heading, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import {
	getAllAuctions,
	getAllValidListings,
} from "thirdweb/extensions/marketplace";
import { useState } from "react";
import { Link } from "@chakra-ui/next-js";

type Props = {
	type: "ERC721" | "ERC1155";
	nftCollection: ThirdwebContract;
	marketplaceContract: ThirdwebContract;
};

export function Collection(props: Props) {
	// `0` is Listings, `1` is `Auctions`
	const [tabIndex, setTabIndex] = useState<number>(0);
	const { nftCollection, type, marketplaceContract } = props;
	const { data: contractMetadata, isLoading: isLoadingContractMetadata } =
		useReadContract(getContractMetadata, {
			contract: nftCollection,
		});

	// In case the collection doesn't have a thumbnail, we use the image of the first NFT
	const { data: firstNFT, isLoading: isLoadingFirstNFT } = useReadContract(
		type === "ERC1155" ? getNFT1155 : getNFT721,
		{
			contract: nftCollection,
			tokenId: 0n,
		},
	);
	const { data: allValidListings, isLoading: isLoadingValidListings } =
		useReadContract(getAllValidListings, { contract: marketplaceContract });

	const { data: allAuctions, isLoading: isLoadingAuctions } = useReadContract(
		getAllAuctions,
		{ contract: marketplaceContract },
	);
	const thumbnailImage =
		contractMetadata?.image || firstNFT?.metadata.image || "";

	const listings = allValidListings?.length
		? allValidListings.filter(
				(item) =>
					item.assetContractAddress.toLowerCase() ===
					nftCollection.address.toLowerCase(),
			)
		: [];
	console.log({ allValidListings, allAuctions });
	return (
		<>
			<Box mt="24px">
				<Flex direction="column" gap="4">
					<MediaRenderer
						client={client}
						src={thumbnailImage}
						style={{
							marginLeft: "auto",
							marginRight: "auto",
							borderRadius: "20px",
							width: "200px",
							height: "200px",
						}}
					/>
					<Heading mx="auto">
						{contractMetadata?.name || "Unknown collection"}
					</Heading>
					{contractMetadata?.description && (
						<Text
							maxW={{ lg: "500px", base: "300px" }}
							mx="auto"
							textAlign="center"
						>
							{contractMetadata.description}
						</Text>
					)}

					<Tabs
						variant="soft-rounded"
						mx="auto"
						mt="20px"
						onChange={(index) => setTabIndex(index)}
						isLazy
					>
						<TabList>
							<Tab>Listings ({listings.length || 0})</Tab>
							<Tab>Auctions ({allAuctions?.length || 0})</Tab>
						</TabList>
					</Tabs>
				</Flex>
			</Box>
			<Flex>
				<Flex
					wrap="wrap"
					gap="4"
					mt="40px"
					justifyContent="space-around"
					mx="auto"
				>
					{tabIndex === 0 &&
						listings.length > 0 &&
						listings.map((item) => (
							<Box
								key={item.id}
								rounded="12px"
								as={Link}
								href={`/collection/${nftCollection.chain.id}/${
									nftCollection.address
								}/token/${item.asset.id.toString()}`}
								_hover={{ textDecoration: "none" }}
							>
								<Flex direction="column">
									<MediaRenderer
										client={client}
										src={item.asset.metadata.image}
									/>
									<Text>{item.asset?.metadata?.name ?? "Unknown item"}</Text>
									<Text>Price</Text>
									<Text>
										{item.pricePerToken.toString()}{" "}
										{item.currencyValuePerToken.symbol}
									</Text>
								</Flex>
							</Box>
						))}
				</Flex>
			</Flex>
		</>
	);
}

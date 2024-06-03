import { Box, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { blo } from "blo";
import { shortenAddress } from "thirdweb/utils";
import type { Account } from "thirdweb/wallets";
import { ProfileMenu } from "./Menu";
import { useState } from "react";
import { NFT_CONTRACTS, type NftContract } from "@/consts/nft_contracts";
import { useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { client } from "@/consts/client";
import { getOwnedERC721s } from "@/extensions/getOwnedERC721s";
import { getOwnedNFTs } from "thirdweb/extensions/erc1155";
import { OwnedItem } from "./OwnedItem";

type Props = {
	account: Account;
};

export function ProfileSection(props: Props) {
	const { account } = props;
	const [selectedCollection, setSelectedCollection] = useState<NftContract>(
		NFT_CONTRACTS[0],
	);
	const contract = getContract({
		address: selectedCollection.address,
		chain: selectedCollection.chain,
		client,
	});

	const {
		data,
		error,
		isLoading: isLoadingOwnedNFTs,
	} = useReadContract(
		// @ts-ignore TODO fix later
		selectedCollection.type === "ERC1155" ? getOwnedNFTs : getOwnedERC721s,
		{
			contract,
			owner: account.address,
			requestPerSec: 50,
		},
	);
	console.log({ data, error });
	return (
		<Box px={{ lg: "100px", base: "20px" }}>
			<Flex direction={{ lg: "row", md: "row", sm: "column" }} gap={5}>
				<Img
					src={blo(account.address as `0x${string}`)}
					w={{ lg: 150, base: 100 }}
					rounded="8px"
				/>
				<Box my="auto">
					{/* TODO: fetch ENS name */}
					<Heading>Unnamed</Heading>
					<Text color="gray">{shortenAddress(account.address)}</Text>
				</Box>
			</Flex>

			<Flex direction={{ lg: "row", base: "column" }} gap="10" mt="20px">
				<ProfileMenu
					selectedCollection={selectedCollection}
					setSelectedCollection={setSelectedCollection}
				/>
				{isLoadingOwnedNFTs ? (
					<Box>Loading...</Box>
				) : (
					<>
						{data && data.length > 0 ? (
							<Flex direction="row" wrap="wrap" gap="3">
								{data?.map((item) => (
									<OwnedItem key={item.id.toString()} nft={item} />
								))}
							</Flex>
						) : (
							<Box>You do not own any NFT in this collection</Box>
						)}
					</>
				)}
			</Flex>
		</Box>
	);
}

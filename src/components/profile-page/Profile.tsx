import {
  Box,
  Flex,
  Heading,
  Img,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { blo } from "blo";
import { shortenAddress } from "thirdweb/utils";
import type { Account } from "thirdweb/wallets";
import { ProfileMenu } from "./Menu";
import { useState } from "react";
import { NFT_CONTRACTS, type NftContract } from "@/consts/nft_contracts";
import { MediaRenderer, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { client } from "@/consts/client";
import { getOwnedERC721s } from "@/extensions/getOwnedERC721s";
import { getOwnedNFTs } from "thirdweb/extensions/erc1155";
import { OwnedItem } from "./OwnedItem";
import { getAllValidListings } from "thirdweb/extensions/marketplace";
import { MARKETPLACE_CONTRACTS } from "@/consts/marketplace_contract";
import { Link } from "@chakra-ui/next-js";

type Props = {
  account: Account;
};

export function ProfileSection(props: Props) {
  const { account } = props;
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selectedCollection, setSelectedCollection] = useState<NftContract>(
    NFT_CONTRACTS[0]
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
      queryOptions: {
        enabled: !!account,
      },
    }
  );

  const chain = contract.chain;
  const marketplaceContractAddress = MARKETPLACE_CONTRACTS.find(
    (o) => o.chain.id === chain.id
  )?.address;
  if (!marketplaceContractAddress) throw Error("No marketplace contract found");
  const marketplaceContract = getContract({
    address: marketplaceContractAddress,
    chain,
    client,
  });
  const { data: allValidListings, isLoading: isLoadingValidListings } =
    useReadContract(getAllValidListings, {
      contract: marketplaceContract,
      queryOptions: { enabled: data && data.length > 0 },
    });
  const listings = allValidListings?.length
    ? allValidListings.filter(
        (item) =>
          item.assetContractAddress.toLowerCase() ===
            contract.address.toLowerCase() &&
          item.creatorAddress.toLowerCase() === account.address.toLowerCase()
      )
    : [];
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
            <Flex direction="column">
              <Tabs
                variant="soft-rounded"
                // mt="10px"
                mb="10px"
                onChange={(index) => setTabIndex(index)}
                isLazy
                defaultIndex={0}
              >
                <TabList>
                  <Tab>Owned ({data?.length})</Tab>
                  <Tab>Listings ({listings.length || 0})</Tab>
                  {/* <Tab>Auctions ({allAuctions?.length || 0})</Tab> */}
                </TabList>
              </Tabs>
              {tabIndex === 0 ? (
                <>
                  {data && data.length > 0 ? (
                    <Flex
                      direction="row"
                      wrap="wrap"
                      gap="3"
                      justifyContent="space-evenly"
                    >
                      {data?.map((item) => (
                        <OwnedItem
                          key={item.id.toString()}
                          nftCollection={contract}
                          nft={item}
                        />
                      ))}
                    </Flex>
                  ) : (
                    <Box>You do not own any NFT in this collection</Box>
                  )}
                </>
              ) : (
                <>
                  {listings && listings.length > 0 ? (
                    <Flex
                      direction="row"
                      wrap="wrap"
                      gap="3"
                      justifyContent="space-evenly"
                    >
                      {listings?.map((item) => (
                        <Box
                          key={item.id}
                          rounded="12px"
                          as={Link}
                          href={`/collection/${contract.chain.id}/${
                            contract.address
                          }/token/${item.asset.id.toString()}`}
                          _hover={{ textDecoration: "none" }}
                        >
                          <Flex direction="column">
                            <MediaRenderer
                              client={client}
                              src={item.asset.metadata.image}
                            />
                            <Text>
                              {item.asset?.metadata?.name ?? "Unknown item"}
                            </Text>
                            <Text>Price</Text>
                            <Text>
                              {item.pricePerToken.toString()}{" "}
                              {item.currencyValuePerToken.symbol}
                            </Text>
                          </Flex>
                        </Box>
                      ))}
                    </Flex>
                  ) : (
                    <Box>You do not have any listing with this collection</Box>
                  )}
                </>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}

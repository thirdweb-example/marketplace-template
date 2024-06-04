import { client } from "@/consts/client";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { sendAndConfirmTransaction } from "thirdweb";
import type { ThirdwebContract } from "thirdweb/contract";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFT as getERC1155 } from "thirdweb/extensions/erc1155";
import { getNFT as getERC721 } from "thirdweb/extensions/erc721";
import {
  buyFromListing,
  cancelListing,
  getAllAuctions,
  getAllValidListings,
  getListing,
} from "thirdweb/extensions/marketplace";
import {
  MediaRenderer,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { NftAttributes } from "./NftAttributes";
import { CreateListing } from "./CreateListing";

type Props = {
  type: "ERC721" | "ERC1155";
  nftCollection: ThirdwebContract;
  marketplaceContract: ThirdwebContract;
  tokenId: bigint;
};

export function Token(props: Props) {
  const { type, nftCollection, marketplaceContract, tokenId } = props;
  const account = useActiveAccount();
  const { data: contractMetadata, isLoading: isLoadingContractMetadata } =
    useReadContract(getContractMetadata, {
      contract: nftCollection,
    });
  const { data: nft, isLoading: isLoadingNFT } = useReadContract(
    type === "ERC1155" ? getERC1155 : getERC721,
    {
      tokenId: BigInt(tokenId),
      contract: nftCollection,
      includeOwner: true,
    }
  );
  const { data: allValidListings, isLoading: isLoadingValidListings } =
    useReadContract(getAllValidListings, { contract: marketplaceContract });

  const { data: allAuctions, isLoading: isLoadingAuctions } = useReadContract(
    getAllAuctions,
    { contract: marketplaceContract }
  );
  const listings = (allValidListings || []).filter(
    (item) =>
      item.assetContractAddress.toLowerCase() ===
        nftCollection.address.toLowerCase() && item.asset.id === BigInt(tokenId)
  );
  console.log({ listings });
  const auctions = (allAuctions || []).filter(
    (item) =>
      item.assetContractAddress.toLowerCase() ===
        nftCollection.address.toLowerCase() && item.asset.id === BigInt(tokenId)
  );
  const allLoaded =
    !isLoadingContractMetadata &&
    !isLoadingNFT &&
    !isLoadingValidListings &&
    !isLoadingAuctions;

  const ownedByYou =
    nft?.owner?.toLowerCase() === account?.address.toLowerCase();

  if (allLoaded) console.log({ auctions, listings, nft, contractMetadata });
  return (
    <Flex>
      <Box mt="24px" mx="auto">
        <Flex
          direction={{ lg: "row", base: "column" }}
          justifyContent={{ lg: "center", base: "space-between" }}
          gap={{ lg: 20, base: 5 }}
        >
          <Flex direction="column" w={{ lg: "45vw", base: "90vw" }} gap="5">
            <MediaRenderer
              client={client}
              src={nft?.metadata.image}
              style={{ width: "max-content", height: "auto", aspectRatio: "1" }}
            />
            <Accordion allowToggle allowMultiple defaultIndex={[0]}>
              {nft?.metadata.description && (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Description
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {nft.metadata.description}
                  </AccordionPanel>
                </AccordionItem>
              )}

              {nft?.metadata?.attributes &&
                // @ts-ignore TODO FIx later
                nft?.metadata?.attributes.length > 0 && (
                  <NftAttributes attributes={nft.metadata.attributes} />
                )}

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Details
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex direction="row" justifyContent="space-between" mb="1">
                    <Text>Contract address</Text>
                    <Link color="purple" href="">
                      {shortenAddress(nftCollection.address)}
                    </Link>
                  </Flex>
                  <Flex direction="row" justifyContent="space-between" mb="1">
                    <Text>Token ID</Text>
                    <Link color="purple" href="">
                      {nft?.id.toString()}
                    </Link>
                  </Flex>
                  <Flex direction="row" justifyContent="space-between" mb="1">
                    <Text>Token Standard</Text>
                    <Text>{type}</Text>
                  </Flex>
                  <Flex direction="row" justifyContent="space-between" mb="1">
                    <Text>Chain</Text>
                    <Text>{nftCollection.chain.name ?? "Unnamed chain"}</Text>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
          <Box w={{ lg: "45vw", base: "90vw" }}>
            <Text>Collection</Text>
            <Flex direction="row" gap="3">
              <Heading>{contractMetadata?.name}</Heading>
              <Link
                color="gray"
                href={`/collection/${nftCollection.chain.id}/${nftCollection.address}`}
              >
                <FaExternalLinkAlt size={20} />
              </Link>
            </Flex>
            <br />
            <Text># {nft?.id.toString()}</Text>
            <Heading>{nft?.metadata.name}</Heading>
            <br />
            <Text>Current owner</Text>
            <Flex direction="row">
              <Heading>
                {nft?.owner ? shortenAddress(nft.owner) : "N/A"}{" "}
              </Heading>
              {ownedByYou && <Text color="gray">(You)</Text>}
            </Flex>
            {account && nft && (
              <CreateListing
                nftContract={nftCollection}
                marketplaceContract={marketplaceContract}
                tokenId={nft?.id}
                account={account}
                type={type}
              />
            )}
            <Accordion
              mt="30px"
              allowToggle
              sx={{ container: {} }}
              defaultIndex={[0]}
            >
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Listings
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {listings.length > 0 ? (
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Price</Th>
                            <Th>Qty</Th>
                            <Th>Expiration</Th>
                            <Th>From</Th>
                            <Th>{""}</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {listings.map((item) => {
                            const listedByYou =
                              item.creatorAddress.toLowerCase() ===
                              account?.address.toLowerCase();
                            return (
                              <Tr key={item.id.toString()}>
                                <Td>
                                  {item.pricePerToken.toString()}{" "}
                                  {item.currencyValuePerToken.symbol}
                                </Td>
                                <Td>{item.quantity.toString()}</Td>
                                <Td>{getExpiration(item.endTimeInSeconds)}</Td>
                                <Td>{shortenAddress(item.creatorAddress)}</Td>
                                {account && (
                                  <Td>
                                    {!listedByYou ? (
                                      <Button
                                        onClick={async () => {
                                          const transaction = buyFromListing({
                                            contract: marketplaceContract,
                                            listingId: item.id,
                                            quantity: item.quantity,
                                            recipient: account.address,
                                          });
                                          const receipt =
                                            sendAndConfirmTransaction({
                                              transaction,
                                              account,
                                            });
                                        }}
                                      >
                                        Buy
                                      </Button>
                                    ) : (
                                      <Button
                                        onClick={async () => {
                                          const transaction = cancelListing({
                                            contract: marketplaceContract,
                                            listingId: item.id,
                                          });
                                          const receipt =
                                            sendAndConfirmTransaction({
                                              transaction,
                                              account,
                                            });
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    )}
                                  </Td>
                                )}
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Text>This item is not listed for sale</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Flex>

        {/* More from the collection */}
        {/* <Accordion allowToggle defaultIndex={[0]}>
				{nft?.metadata.description && (
					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box as="span" flex="1" textAlign="left">
									Description
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>{nft.metadata.description}</AccordionPanel>
					</AccordionItem>
				)}
			</Accordion> */}
      </Box>
    </Flex>
  );
}

function getExpiration(endTimeInSeconds: bigint) {
  // Get the current date and time
  const currentDate = new Date();

  // Convert seconds to milliseconds (bigint)
  const milliseconds: bigint = endTimeInSeconds * 1000n;

  // Calculate the future date by adding milliseconds to the current date
  const futureDate = new Date(currentDate.getTime() + Number(milliseconds));

  // Format the future date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    timeZoneName: "short",
  };
  const formattedDate = futureDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

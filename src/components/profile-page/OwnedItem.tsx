import { client } from "@/consts/client";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import type { NFT, ThirdwebContract } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";

export function OwnedItem(props: {
  nft: NFT;
  nftCollection: ThirdwebContract;
}) {
  const { nft, nftCollection } = props;
  return (
    <>
      <Box
        rounded="12px"
        as={Link}
        href={`/collection/${nftCollection.chain.id}/${
          nftCollection.address
        }/token/${nft.id.toString()}`}
        _hover={{ textDecoration: "none" }}
        w={250}
      >
        <Flex direction="column">
          <MediaRenderer client={client} src={nft.metadata.image} />
          <Text>{nft.metadata?.name ?? "Unknown item"}</Text>
        </Flex>
      </Box>
    </>
  );
}

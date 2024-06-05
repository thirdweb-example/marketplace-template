import { client } from "@/consts/client";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  SimpleGrid,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { toEther } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";

export function ListingGrid() {
  const { listingsInSelectedCollection, nftContract } = useMarketplaceContext();
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 4, lg: 4, xl: 5 });
  if (!listingsInSelectedCollection || !listingsInSelectedCollection.length)
    return <></>;
  return (
    <SimpleGrid columns={columns} spacing={4} p={4}>
      {listingsInSelectedCollection.map((item) => (
        <Box
          key={item.id}
          rounded="12px"
          as={Link}
          href={`/collection/${nftContract.chain.id}/${
            nftContract.address
          }/token/${item.asset.id.toString()}`}
          _hover={{ textDecoration: "none" }}
        >
          <Flex direction="column">
            <MediaRenderer client={client} src={item.asset.metadata.image} />
            <Text>{item.asset?.metadata?.name ?? "Unknown item"}</Text>
            <Text>Price</Text>
            <Text>
              {toEther(item.pricePerToken)} {item.currencyValuePerToken.symbol}
            </Text>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
}

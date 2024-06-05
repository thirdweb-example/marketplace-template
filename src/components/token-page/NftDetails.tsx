import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Link } from "@chakra-ui/next-js";
import {
  AccordionButton,
  Text,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import type { NFT } from "thirdweb";
import { shortenAddress } from "thirdweb/utils";

type Props = {
  nft: NFT;
};

export function NftDetails(props: Props) {
  const { type, nftContract } = useMarketplaceContext();
  const { nft } = props;
  const contractUrl = `${
    nftContract.chain.blockExplorers
      ? nftContract.chain.blockExplorers[0]?.url
      : ""
  }/address/${nftContract.address}`;
  const tokenUrl = `${
    nftContract.chain.blockExplorers
      ? nftContract.chain.blockExplorers[0]?.url
      : ""
  }/nft/${nftContract.address}/${nft.id.toString()}`;
  return (
    <AccordionItem>
      <Text>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Details
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Text>
      <AccordionPanel pb={4}>
        <Flex direction="row" justifyContent="space-between" mb="1">
          <Text>Contract address</Text>
          <Link color="purple" href={contractUrl} target="_blank">
            {shortenAddress(nftContract.address)}
          </Link>
        </Flex>
        <Flex direction="row" justifyContent="space-between" mb="1">
          <Text>Token ID</Text>
          <Link color="purple" href={tokenUrl} target="_blank">
            {nft?.id.toString()}
          </Link>
        </Flex>
        <Flex direction="row" justifyContent="space-between" mb="1">
          <Text>Token Standard</Text>
          <Text>{type}</Text>
        </Flex>
        <Flex direction="row" justifyContent="space-between" mb="1">
          <Text>Chain</Text>
          <Text>{nftContract.chain.name ?? "Unnamed chain"}</Text>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}

"use client";

import { client } from "@/consts/client";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  SimpleGrid,
  useBreakpointValue,
  Text,
  Button,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { getNFTs as getNFTs1155 } from "thirdweb/extensions/erc1155";
import { getNFTs as getNFTs721 } from "thirdweb/extensions/erc721";
import { MediaRenderer, useReadContract } from "thirdweb/react";

export function AllNftsGrid() {
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const { nftContract, type, supplyInfo } = useMarketplaceContext();
  const startTokenId = supplyInfo?.startTokenId ?? 0n;
  const totalItems: bigint = supplyInfo
    ? supplyInfo.endTokenId - supplyInfo.startTokenId + 1n
    : 0n;
  const numberOfPages: number = Number(
    (totalItems + BigInt(itemsPerPage) - 1n) / BigInt(itemsPerPage)
  );
  const pages: { start: number; count: number }[] = [];

  for (let i = 0; i < numberOfPages; i++) {
    const currentStartTokenId = startTokenId + BigInt(i * itemsPerPage);
    const remainingItems = totalItems - BigInt(i * itemsPerPage);
    const count =
      remainingItems < BigInt(itemsPerPage)
        ? Number(remainingItems)
        : itemsPerPage;
    pages.push({ start: Number(currentStartTokenId), count: count });
  }
  const { data: allNFTs } = useReadContract(
    type === "ERC1155" ? getNFTs1155 : getNFTs721,
    {
      contract: nftContract,
      start: pages[currentPageIndex].start,
      count: pages[currentPageIndex].count,
    }
  );
  const len = allNFTs?.length ?? 0;
  const columns = useBreakpointValue({
    base: 1,
    sm: Math.min(len, 2),
    md: Math.min(len, 4),
    lg: Math.min(len, 4),
    xl: Math.min(len, 5),
  });

  console.log({ pages, currentPageIndex, length: pages.length });
  return (
    <>
      <SimpleGrid columns={columns} spacing={4} p={4} mx="auto" mt="20px">
        {allNFTs && allNFTs.length > 0 ? (
          allNFTs.map((item) => (
            <Box
              key={item.id}
              rounded="12px"
              as={Link}
              href={`/collection/${nftContract.chain.id}/${
                nftContract.address
              }/token/${item.id.toString()}`}
              _hover={{ textDecoration: "none" }}
            >
              <Flex direction="column">
                <MediaRenderer client={client} src={item.metadata.image} />
                <Text>{item.metadata?.name ?? "Unknown item"}</Text>
              </Flex>
            </Box>
          ))
        ) : (
          <Box mx="auto">Loading...</Box>
        )}
      </SimpleGrid>
      <Box
        mx="auto"
        maxW={{ base: "90vw", lg: "700px" }}
        mt="20px"
        px="10px"
        py="5px"
        overflowX="auto"
      >
        <Flex direction="row" justifyContent="center" gap="3">
          <Button
            onClick={() => setCurrentPageIndex(0)}
            isDisabled={currentPageIndex === 0}
          >
            <MdKeyboardDoubleArrowLeft />
          </Button>
          <Button
            isDisabled={currentPageIndex === 0}
            onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
          >
            <RiArrowLeftSLine />
          </Button>
          <Text my="auto">
            Page {currentPageIndex + 1} of {pages.length}
          </Text>
          <Button
            isDisabled={currentPageIndex === pages.length - 1}
            onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
          >
            <RiArrowRightSLine />
          </Button>
          <Button
            onClick={() => setCurrentPageIndex(pages.length - 1)}
            isDisabled={currentPageIndex === pages.length - 1}
          >
            <MdKeyboardDoubleArrowRight />
          </Button>
          {/* <Select
            w="80px"
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            {[20, 40, 60].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select> */}
        </Flex>
      </Box>
    </>
  );
}

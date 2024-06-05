import { NFT_CONTRACTS, type NftContract } from "@/consts/nft_contracts";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  selectedCollection: NftContract;
  setSelectedCollection: Dispatch<SetStateAction<NftContract>>;
};

export function ProfileMenu(props: Props) {
  const { selectedCollection, setSelectedCollection } = props;
  return (
    <Box>
      <Accordion
        allowToggle
        defaultIndex={[0]}
        w={{ lg: "300px", base: "90vw" }}
      >
        <AccordionItem>
          <Text>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Collections
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
            {NFT_CONTRACTS.map((item) => (
              <Box
                key={item.address}
                mb="10px"
                as={Button}
                h="56px"
                bg="transparent"
                _hover={{ bg: "transparent" }}
                opacity={item.address === selectedCollection.address ? 1 : 0.4}
                onClick={() => setSelectedCollection(item)}
              >
                <Flex direction="row" gap="3">
                  <Image src={item.thumbnailUrl ?? ""} w="40px" rounded="8x" />
                  <Box my="auto">
                    <Text>{item.title ?? "Unknown collection"}</Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

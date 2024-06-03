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
		<Box w={{ lg: "350px", base: "90vw" }}>
			<Accordion allowToggle defaultIndex={[0]}>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box as="span" flex="1" textAlign="left">
								Collections
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
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

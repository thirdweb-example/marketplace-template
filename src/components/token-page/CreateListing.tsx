import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useRef } from "react";
import {
  NATIVE_TOKEN_ADDRESS,
  sendAndConfirmTransaction,
  type ThirdwebContract,
} from "thirdweb";
import { createListing } from "thirdweb/extensions/marketplace";
import type { Account } from "thirdweb/wallets";

type Props = {
  nftContract: ThirdwebContract;
  marketplaceContract: ThirdwebContract;
  tokenId: bigint;
  account: Account;
  type: "ERC1155" | "ERC721";
};

export function CreateListing(props: Props) {
  const priceRef = useRef<HTMLInputElement>(null);
  const { nftContract, marketplaceContract, tokenId, type, account } = props;
  return (
    <>
      <br />
      <Text>Price</Text>
      <Flex direction="column">
        <Input
          type="number"
          mt="10px"
          w={250}
          placeholder={nftContract.chain.nativeCurrency?.symbol}
          ref={priceRef}
        />
        <Button
          w={250}
          mt="12px"
          onClick={async () => {
            const value = priceRef.current?.value;
            if (!value) throw Error("Need to enter a price for this listing");
            const now = new Date();
            const transaction = createListing({
              contract: marketplaceContract,
              assetContractAddress: nftContract.address,
              tokenId,
              quantity: type === "ERC721" ? 1n : 1n,
              currencyContractAddress: NATIVE_TOKEN_ADDRESS,
              pricePerToken: value,
            });
            const receipt = await sendAndConfirmTransaction({
              transaction,
              account,
            });
          }}
        >
          List
        </Button>
      </Flex>
    </>
  );
}

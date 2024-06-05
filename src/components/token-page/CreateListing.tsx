import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { NATIVE_TOKEN_ADDRESS, sendAndConfirmTransaction } from "thirdweb";
import { createListing } from "thirdweb/extensions/marketplace";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import type { Account } from "thirdweb/wallets";

type Props = {
  tokenId: bigint;
  account: Account;
};

export function CreateListing(props: Props) {
  const priceRef = useRef<HTMLInputElement>(null);
  const { tokenId, account } = props;
  const switchChain = useSwitchActiveWalletChain();
  const activeChain = useActiveWalletChain();
  const { nftContract, marketplaceContract, refetchAllListings, type } =
    useMarketplaceContext();

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
            if (activeChain?.id !== nftContract.chain.id) {
              await switchChain(nftContract.chain);
            }
            const transaction = createListing({
              contract: marketplaceContract,
              assetContractAddress: nftContract.address,
              tokenId,
              quantity: type === "ERC721" ? 1n : 1n,
              currencyContractAddress: NATIVE_TOKEN_ADDRESS,
              pricePerToken: value,
            });
            await sendAndConfirmTransaction({
              transaction,
              account,
            });
            refetchAllListings();
          }}
        >
          List
        </Button>
      </Flex>
    </>
  );
}

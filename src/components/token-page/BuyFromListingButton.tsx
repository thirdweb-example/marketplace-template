import { client } from "@/consts/client";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Button, useToast } from "@chakra-ui/react";
import { sendTransaction, waitForReceipt } from "thirdweb";
import {
  buyFromListing,
  type DirectListing,
} from "thirdweb/extensions/marketplace";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import type { Account } from "thirdweb/wallets";

type Props = {
  listing: DirectListing;
  account: Account;
};

export default function BuyFromListingButton(props: Props) {
  const { account, listing } = props;
  const { marketplaceContract, refetchAllListings, nftContract } =
    useMarketplaceContext();
  const switchChain = useSwitchActiveWalletChain();
  const activeChain = useActiveWalletChain();
  const toast = useToast();
  return (
    <Button
      onClick={async () => {
        if (activeChain?.id !== nftContract.chain.id) {
          await switchChain(nftContract.chain);
        }
        try {
          const transaction = buyFromListing({
            contract: marketplaceContract,
            listingId: listing.id,
            quantity: listing.quantity,
            recipient: account.address,
          });
          const receipt = await sendTransaction({
            transaction,
            account,
          });
          await waitForReceipt({
            transactionHash: receipt.transactionHash,
            client,
            chain: nftContract.chain,
          });
          toast({
            title:
              "Purchase completed! The asset(s) should arrive in your account shortly",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          refetchAllListings();
        } catch (err) {
          console.error(err);
          if ((err as Error).message.startsWith("insufficient funds for gas")) {
            toast({
              title: "You don't have enough funds for this purchase.",
              description: `Make sure you have enough gas for the transaction + ${listing.currencyValuePerToken.displayValue} ${listing.currencyValuePerToken.symbol}`,
              status: "error",
              isClosable: true,
              duration: 7000,
            });
          }
        }
      }}
    >
      Buy
    </Button>
  );
}

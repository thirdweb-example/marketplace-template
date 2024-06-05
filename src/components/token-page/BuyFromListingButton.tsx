import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Button } from "@chakra-ui/react";
import { sendAndConfirmTransaction } from "thirdweb";
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
  return (
    <Button
      onClick={async () => {
        if (activeChain?.id !== nftContract.chain.id) {
          await switchChain(nftContract.chain);
        }
        const transaction = buyFromListing({
          contract: marketplaceContract,
          listingId: listing.id,
          quantity: listing.quantity,
          recipient: account.address,
        });
        await sendAndConfirmTransaction({
          transaction,
          account,
        });
        refetchAllListings();
      }}
    >
      Buy
    </Button>
  );
}

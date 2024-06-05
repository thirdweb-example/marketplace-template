import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Button } from "@chakra-ui/react";
import { sendAndConfirmTransaction } from "thirdweb";
import { cancelListing } from "thirdweb/extensions/marketplace";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import type { Account } from "thirdweb/wallets";

type Props = {
  account: Account;
  listingId: bigint;
};

export default function CancelListingButton(props: Props) {
  const { marketplaceContract, refetchAllListings, nftContract } =
    useMarketplaceContext();
  const switchChain = useSwitchActiveWalletChain();
  const activeChain = useActiveWalletChain();
  const { account, listingId } = props;
  return (
    <Button
      onClick={async () => {
        if (activeChain?.id !== nftContract.chain.id) {
          await switchChain(nftContract.chain);
        }
        const transaction = cancelListing({
          contract: marketplaceContract,
          listingId,
        });
        await sendAndConfirmTransaction({
          transaction,
          account,
        });
        refetchAllListings();
      }}
    >
      Cancel
    </Button>
  );
}

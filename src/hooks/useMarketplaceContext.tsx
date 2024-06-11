"use client";

import { client } from "@/consts/client";
import { MARKETPLACE_CONTRACTS } from "@/consts/marketplace_contract";
import { NFT_CONTRACTS } from "@/consts/nft_contracts";
import { SUPPORTED_TOKENS, Token } from "@/consts/supported_tokens";
import {
  getSupplyInfo,
  SupplyInfo,
} from "@/extensions/getLargestCirculatingTokenId";
import { Box, Spinner } from "@chakra-ui/react";
import { createContext, type ReactNode, useContext } from "react";
import { getContract, type ThirdwebContract } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { isERC1155 } from "thirdweb/extensions/erc1155";
import { isERC721 } from "thirdweb/extensions/erc721";
import {
  type DirectListing,
  type EnglishAuction,
  getAllAuctions,
  getAllValidListings,
} from "thirdweb/extensions/marketplace";
import { useReadContract } from "thirdweb/react";

export type NftType = "ERC1155" | "ERC721";

/**
 * Support for English auction coming soon.
 */
const SUPPORT_AUCTION = false;

type TMarketplaceContext = {
  marketplaceContract: ThirdwebContract;
  nftContract: ThirdwebContract;
  type: NftType;
  isLoading: boolean;
  allValidListings: DirectListing[] | undefined;
  allAuctions: EnglishAuction[] | undefined;
  contractMetadata:
    | {
        [key: string]: any;
        name: string;
        symbol: string;
      }
    | undefined;
  refetchAllListings: Function;
  isRefetchingAllListings: boolean;
  listingsInSelectedCollection: DirectListing[];
  supplyInfo: SupplyInfo | undefined;
  supportedTokens: Token[];
};

const MarketplaceContext = createContext<TMarketplaceContext | undefined>(
  undefined
);

export default function MarketplaceProvider({
  chainId,
  contractAddress,
  children,
}: {
  chainId: string;
  contractAddress: string;
  children: ReactNode;
}) {
  let _chainId: number;
  try {
    _chainId = Number.parseInt(chainId);
  } catch (err) {
    throw new Error("Invalid chain ID");
  }
  const marketplaceContract = MARKETPLACE_CONTRACTS.find(
    (item) => item.chain.id === _chainId
  );
  if (!marketplaceContract) {
    throw new Error("Marketplace not supported on this chain");
  }

  const collectionSupported = NFT_CONTRACTS.find(
    (item) =>
      item.address.toLowerCase() === contractAddress.toLowerCase() &&
      item.chain.id === _chainId
  );
  // You can remove this condition if you want to supported _any_ nft collection
  // or you can update the entries in `NFT_CONTRACTS`
  // if (!collectionSupported) {
  //   throw new Error("Contract not supported on this marketplace");
  // }

  const contract = getContract({
    chain: marketplaceContract.chain,
    client,
    address: contractAddress,
  });

  const marketplace = getContract({
    address: marketplaceContract.address,
    chain: marketplaceContract.chain,
    client,
  });

  const { data: is721, isLoading: isChecking721 } = useReadContract(isERC721, {
    contract,
    queryOptions: {
      enabled: !!marketplaceContract,
    },
  });
  const { data: is1155, isLoading: isChecking1155 } = useReadContract(
    isERC1155,
    { contract, queryOptions: { enabled: !!marketplaceContract } }
  );

  const isNftCollection = is1155 || is721;

  if (!isNftCollection && !isChecking1155 && !isChecking721)
    throw new Error("Not a valid NFT collection");

  const { data: contractMetadata, isLoading: isLoadingContractMetadata } =
    useReadContract(getContractMetadata, {
      contract,
      queryOptions: {
        enabled: isNftCollection,
      },
    });

  const {
    data: allValidListings,
    isLoading: isLoadingValidListings,
    refetch: refetchAllListings,
    isRefetching: isRefetchingAllListings,
  } = useReadContract(getAllValidListings, {
    contract: marketplace,
    queryOptions: {
      enabled: isNftCollection,
    },
  });

  const listingsInSelectedCollection = allValidListings?.length
    ? allValidListings.filter(
        (item) =>
          item.assetContractAddress.toLowerCase() ===
          contract.address.toLowerCase()
      )
    : [];

  const { data: allAuctions, isLoading: isLoadingAuctions } = useReadContract(
    getAllAuctions,
    {
      contract: marketplace,
      queryOptions: { enabled: isNftCollection && SUPPORT_AUCTION },
    }
  );

  const { data: supplyInfo, isLoading: isLoadingSupplyInfo } = useReadContract(
    getSupplyInfo,
    {
      contract,
    }
  );

  const isLoading =
    isChecking1155 ||
    isChecking721 ||
    isLoadingAuctions ||
    isLoadingContractMetadata ||
    isLoadingValidListings ||
    isLoadingSupplyInfo;

  const supportedTokens: Token[] =
    SUPPORTED_TOKENS.find(
      (item) => item.chain.id === marketplaceContract.chain.id
    )?.tokens || [];

  return (
    <MarketplaceContext.Provider
      value={{
        marketplaceContract: marketplace,
        nftContract: contract,
        isLoading,
        type: is1155 ? "ERC1155" : "ERC721",
        allValidListings,
        allAuctions,
        contractMetadata,
        refetchAllListings,
        isRefetchingAllListings,
        listingsInSelectedCollection,
        supplyInfo,
        supportedTokens,
      }}
    >
      {children}
      {isLoading && (
        <Box
          position="fixed"
          bottom="10px"
          right="10px"
          backgroundColor="rgba(0, 0, 0, 0.7)"
          padding="10px"
          borderRadius="md"
          zIndex={1000}
        >
          <Spinner size="lg" color="purple" />
        </Box>
      )}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplaceContext() {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error(
      "useMarketplaceContext must be used inside MarketplaceProvider"
    );
  }
  return context;
}

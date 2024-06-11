import { type BaseTransactionOptions, type NFT, readContract } from "thirdweb";
import {
  balanceOfBatch,
  getNFT,
  nextTokenIdToMint,
} from "thirdweb/extensions/erc1155";

export type GetERC1155sParams = {
  /**
   * Which tokenId to start at.
   */
  start?: number;
  /**
   * The number of NFTs to retrieve. Defaults to 100
   */
  count?: number;
  /**
   * The address of the wallet to get the NFTs of.
   */
  owner: string;

  requestPerSec?: number;
};

/**
 * thirdweb SDK's `getOwnedNFTs` extension only works if your contract has the extension `nextTokenIdToMint`
 * This custom extension works for the contracts that don't have such method, but `nextTokenId`
 * It also allow you to set a limit on how many RPC requests should per called per second
 * @param options
 * @returns A list of NFTs (type: NFT[])
 *
 * @example
 * // Usage with React
 * const { data, error } = useReadContract(getOwnedERC1155s, {
 *	 contract,
 *	 address: "0x...",
 *   start: 0,
 *   count: 20,
 * });
 *
 * // Usage with TypeScript
 * const nfts = await getOwnedERC1155s({
 *   contract,
 *   address: "0x...",
 *   start: 0,
 *   count: 20,
 * });
 */

export async function getOwnedERC1155s(
  options: BaseTransactionOptions<GetERC1155sParams>
): Promise<NFT[]> {
  const { contract, owner } = options;
  const maxId = await Promise.allSettled([
    readContract({
      contract: contract,
      method: "function nextTokenId() view returns (uint256)",
      params: [],
    }),
    nextTokenIdToMint(options),
  ]).then(([_next, _nextToMint]) => {
    if (_next.status === "fulfilled") {
      return _next.value;
    }
    if (_nextToMint.status === "fulfilled") {
      return _nextToMint.value;
    }
    throw Error("Contract doesn't have required extension");
  });
  const owners: string[] = [];
  const tokenIds: bigint[] = [];
  for (let i = 0n; i < maxId; i++) {
    owners.push(owner);
    tokenIds.push(i);
  }

  const balances = await balanceOfBatch({
    ...options,
    owners,
    tokenIds,
  });

  let ownedBalances = balances
    .map((b, i) => {
      return {
        tokenId: i,
        balance: b,
      };
    })
    .filter((b) => b.balance > 0);

  if (options.start || options.count) {
    const start = options?.start || 0;
    const count = options?.count || 100;
    ownedBalances = ownedBalances.slice(start, start + count);
  }

  const nfts = await Promise.all(
    ownedBalances.map((ob) =>
      getNFT({ ...options, tokenId: BigInt(ob.tokenId) })
    )
  );

  return nfts.map((nft, index) => ({
    ...nft,
    owner,
    quantityOwned: ownedBalances[index]?.balance || 0n,
  }));
}

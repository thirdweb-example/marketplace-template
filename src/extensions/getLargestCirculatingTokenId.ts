import type { BaseTransactionOptions } from "thirdweb";
import { isERC1155 } from "thirdweb/extensions/erc1155";
import { isERC721 } from "thirdweb/extensions/erc721";

export type GetSupplyInfo = {};

export type SupplyInfo = {
  startTokenId: bigint;
  endTokenId: bigint;
};
/**
 * Get the largest token id that _is minted_ - works for both ERC721 and ERC1155
 * @param options
 */
export async function getSupplyInfo(
  options: BaseTransactionOptions<GetSupplyInfo>
): Promise<SupplyInfo> {
  const { contract } = options;
  const [_is721, _is1155] = await Promise.all([
    isERC721({ contract }),
    isERC1155({ contract }),
  ]);
  if (!_is1155 && !_is721) {
    throw new Error("Not an NFT collection");
  }
  if (_is1155) {
    const { nextTokenIdToMint } = await import("thirdweb/extensions/erc1155");
    const data: SupplyInfo = {
      startTokenId: 0n,
      endTokenId: await nextTokenIdToMint(options),
    };
    return data;
  } else {
    const { nextTokenIdToMint, startTokenId, totalSupply, ownerOf, getNFT } =
      await import("thirdweb/extensions/erc721");
    const [startTokenId_, maxSupply] = await Promise.allSettled([
      startTokenId(options),
      nextTokenIdToMint(options),
      totalSupply(options),
    ]).then(([_startTokenId, _next, _total]) => {
      // default to 0 if startTokenId is not available
      const startTokenId__ =
        _startTokenId.status === "fulfilled" ? _startTokenId.value : 0n;
      let maxSupply_: bigint;
      // prioritize totalSupply to save on resources
      // since totalSupply should always be less than nextTokenIdToMint
      if (_total.status === "fulfilled") {
        maxSupply_ = _total.value;
      }
      // otherwise use nextTokenIdToMint
      else if (_next.status === "fulfilled") {
        // because we always default the startTokenId to 0 we can safely just always subtract here
        maxSupply_ = _next.value - startTokenId__;
      } else {
        throw new Error(
          "Contract requires either `nextTokenIdToMint` or `totalSupply` function available to determine the next token ID to mint"
        );
      }
      return [startTokenId__, maxSupply_] as const;
    });
    const data: SupplyInfo = {
      startTokenId: startTokenId_,
      endTokenId: maxSupply,
    };
    return data;
  }
}

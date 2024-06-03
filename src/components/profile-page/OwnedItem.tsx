import { client } from "@/consts/client";
import type { NFT } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";

export function OwnedItem(props: { nft: NFT }) {
	return (
		<>
			<MediaRenderer client={client} src={props.nft.metadata.image} />
		</>
	);
}

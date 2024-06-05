"use client";

import { Token } from "@/components/token-page/Token";

export default function ListingPage({
  params,
}: {
  params: { tokenId: string };
}) {
  const { tokenId } = params;
  if (!tokenId) {
    throw new Error("Missing listingId");
  }
  return <Token tokenId={BigInt(tokenId)} />;
}

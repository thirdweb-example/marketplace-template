import type { Chain } from "thirdweb";
import { avalancheFuji, polygonAmoy, sepolia } from "./chains";

export type Token = {
  tokenAddress: string;
  symbol: string;
  icon: string;
};

export type SupportedTokens = {
  chain: Chain;
  tokens: Token[];
};

/**
 * By default you create listings with the payment currency in the native token of the network (eth, avax, matic etc.)
 *
 * If you want to allow users to transact using different ERC20 tokens, you can add them to the config below
 * Keep in mind this is for front-end usage. Make sure your marketplace v3 contracts accept the ERC20s
 * check that in https://thirdweb.com/<chain-id>/<marketplace-v3-address>/permissions -> Asset
 * By default the Marketplace V3 contract supports any asset (token)
 */
export const SUPPORTED_TOKENS: SupportedTokens[] = [
  {
    chain: avalancheFuji,
    tokens: [
      {
        tokenAddress: "0x5425890298aed601595a70ab815c96711a31bc65",
        symbol: "USDC",
        icon: "/erc20-icons/usdc.png",
      },
      {
        tokenAddress: "0x82dcec6aa3c8bfe2c96d40d8805ee0da15708643",
        symbol: "USDT",
        icon: "/erc20-icons/usdt.png",
      },
      // Add more ERC20 here...
    ],
  },

  {
    chain: polygonAmoy,
    tokens: [
      {
        tokenAddress: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582",
        symbol: "USDC",
        icon: "/erc20-icons/usdc.png",
      },
      {
        tokenAddress: "0xbcf39d8616d15fd146dd5db4a86b4f244a9bc772",
        symbol: "USDT",
        icon: "/erc20-icons/usdt.png",
      },
    ],
  },

  {
    chain: sepolia,
    tokens: [
      {
        tokenAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        symbol: "USDC",
        icon: "/erc20-icons/usdc.png",
      },
      {
        tokenAddress: "0x36160274b0ed3673e67f2ca5923560a7a0c523aa",
        symbol: "USDT",
        icon: "/erc20-icons/usdt.png",
      },
    ],
  },
];

export const NATIVE_TOKEN_ICON_MAP: { [key in Chain["id"]]: string } = {
  1: "/native-token-icons/eth.png",
  [sepolia.id]: "/native-token-icons/eth.png",
  [avalancheFuji.id]: "/native-token-icons/avax.png",
  [polygonAmoy.id]: "/native-token-icons/matic.png",
};

import { defineChain } from "thirdweb";

export { avalancheFuji, sepolia } from "thirdweb/chains";

/**
 * Define any custom chain using `defineChain`
 */
export const example_customChain1 = defineChain(0.001); // don't actually use this

// chain.ts
import { defineChain } from "thirdweb/chains";

const yourChainId = 14333;
const yourCustomChain = defineChain(yourChainId);

export { yourCustomChain }

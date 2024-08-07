// chain.ts
import { defineChain, ethereum, bsc } from "thirdweb/chains";

const yourChainId = 14333;
const yourCustomChain = defineChain(yourChainId);

export { ethereum, bsc, yourCustomChain }

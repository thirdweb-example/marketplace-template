import { prepareContractCall, sendTransaction } from "thirdweb";

const transaction = await prepareContractCall({ 
  contract, const contract = someValue}); // Assign a value to contract
const transaction = await prepareContractCall({ contract, method: "function buyFromListing(uint256 _listingId, address _buyFor, uint256 _quantity, ad...", params: [_listingId, _buyFor, _quantity, _currency, _exp });
const { transactionHash } = await sendTransaction({ 
  transaction, 
  account 
});

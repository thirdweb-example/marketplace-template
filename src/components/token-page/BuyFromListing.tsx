import { prepareContractCall, sendTransaction } from "thirdweb";

const transaction = await prepareContractCall({ 
  contract, 
  method: "function buyFromListing(uint256 _listingId, address _buyFor, uint256 _quantity, address _currency, uint256 _expectedTotalPrice) payable", 
  params: [_listingId, _buyFor, _quantity, _currency, _expectedTotalPrice] 
});
const { transactionHash } = await sendTransaction({ 
  transaction, 
  account 
});

import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
	clientId: process.env.NEXT_PUBLIC_TW_CLIENT_ID as string,
});

import { buildSDK, Chains  } from "@balmy/sdk";
const sdk = buildSDK();

async function testBalmySDK() {
  try {
    const testAddress = "0xF8F36F14d22F391429380cE9151453adB01D2472";
    
    // Define tokens for Ethereum chain only since we're using getBalancesForAccountInChain
    const ethereumTokens = [
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
      "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
    ];

    console.log(`Fetching balances for address: ${testAddress}`);
    
    const balances = await sdk.balanceService.getBalancesForAccountInChain({
      chainId: Chains.ETHEREUM.chainId,
      account: testAddress,
      tokens: ethereumTokens,  // Pass the array directly
      config: { timeout: "30s" },
    });

    // Log results
    console.log(`\nBalances for Chain ID: ${Chains.ETHEREUM.chainId}`);
    Object.entries(balances).forEach(([token, balance]) => {
      console.log(`Token ${token}: ${balance.toString()}`);
    });

    return balances;
  } catch (error) {
    console.error("Error testing Balmy SDK:", error);
    throw error;
  }
}

async function main() {
    const request = {
        chainId: Chains.ETHEREUM.chainId,
        sellToken: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        buyToken: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        order: {
            type: "sell",
            sellAmount: "1000000000000",
        },
        slippagePercentage: 100,
        gasSpeed: "fast",
        takerAddress: "0xF8F36F14d22F391429380cE9151453adB01D2472",
        sourceConfig: {
            global: {
                referrer: {
                    address: "0xF8F36F14d22F391429380cE9151453adB01D2472",
                    name: "balmy"
                }
            }
        },
        
    }

    console.log(request);
    
    const quotes = await sdk.quoteService.getQuotes({
        request: request,
        config: {
            timeout: "10s"
        }
    });

    console.log(quotes);

}
// Execute the test
main()
  .then(() => console.log("Test completed successfully"))
  .catch((error) => console.error("Test failed:", error));
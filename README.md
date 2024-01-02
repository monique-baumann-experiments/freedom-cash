# Freedom Cash
🦕 [module](https://deno.land/x/freedom_cash) to stabilize the buy price and increase the sell price of [Freedom Cash](https://FreedomCash.org).

## Utility
Support peer to peer collaboration while preventing pump and dump frauds.  
Reduce dependencies from exchanges by adding a [buy and sell function](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol#L59-L71) within the [smart contract](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol) itself.  
This allows to define a reasonable [pricing algorithm](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol#L49-L58) and ensures that people do not need to waste gas-, liquidity provider- and exchange fees.   

## Usage Example

```ts
import { Bollinger } from "https://deno.land/x/freedom_cash/mod.ts";
import { sleep } from "https://deno.land/x/sleep/mod.ts";

const bollinger = await Bollinger.getInstance()

let repeatXMoreTimes = 9 
const minHistoryLength = 3
const factor = 3

while (repeatXMoreTimes > 0) {
    const randomNumber = Math.round((Math.random() * (81 - 9) + 9))
    bollinger.addToPriceHistory(randomNumber)
    const investmentDecision = bollinger.getInvestmentDecision(minHistoryLength, factor)
    console.log("O.K. I will:", investmentDecision)
    await sleep(9)
    repeatXMoreTimes--
}
```

## Execute Usage Example

```sh
deno run --allow-read --allow-write https://deno.land/x/freedom_cash/usage-example.ts
```

## Q&A 
<b>Why don't you create liquidity as an ETH/FreedomCash Tradingpair on Uniswap?</b>  
  
With our approach we reduce gas fees and avoid exchange fees for Freedom Cash investors.
Our pricing approach protects against ponzi like vulnerabilities & drops of the sell price guaranteed by the [smart contract](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol).


<b>What happens if anyone creates a liquidity pool for Freedom Cash on Uniswap?</b>  
  
People are free to create liquidity pools e.g. with ETH/FreedomCash liquidity on Uniswap. It is just not necessary and not useful.

<b>How is it possible that the sell price never drops?</b>  
  
The sell price of Freedom Cash expressed in Ether can stay as it is or go up. It can never drop.
Please study the [smart contract](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol) and focus on the [getSellPrice](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol#L54-L58) function.  


## Donations
Thanks to [Freedom Cash](https://FreedomCash.org), we are already free.  
If you want to donate, you might consider donating to the [otherparty.co.uk](https://www.otherparty.co.uk/donate-crypto-the-other-party) to ensure people do not need to donate to victims but rather donate successfully to problem solvers.   
  
![direct-democracy](https://github.com/michael-spengler/sleep/assets/145258627/fe97b7da-62b4-4cf6-9be0-7b03b2f3095a)

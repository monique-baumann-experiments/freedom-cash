# Freedom Cash
🦕 [module](https://deno.land/x/freedom_cash) to stabilize the buy price and increase the sell price of [Freedom Cash](https://FreedomCash.org).  

## Utility 
Support peer to peer collaboration while preventing pump and dump frauds.  
Reduce dependencies from exchanges by adding a [buy and sell function](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol#L59-L71) within the [smart contract](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol) itself.  
This allows to define a reasonable [pricing algorithm](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol#L49-L58) and ensures that people do not need to waste gas-, liquidity provider- and exchange fees.   

## Usage Example Beginners Demo

```ts

import { MoniqueDemo } from "./deno/monique-demo.ts";

const sleepTimePerInterval = 3
const minHistoryLength = 3
const relevantHistoryLength = 99
const factor = 3

const monique = await MoniqueDemo.getInstance()
await monique.play(sleepTimePerInterval, minHistoryLength, relevantHistoryLength, factor)
```

## Execute Usage Example Beginners Demo

```sh
deno run --allow-read --allow-write https://deno.land/x/freedom_cash/usage-example-beginners-demo.ts
```

## Usage Example Advanced
```ts
import { MoniqueBaumann } from "./deno/monique-baumann.ts";

const receiverWallets = [ ] // e.g. geocashing wallets / supportive communities wallets etc.
const sleepTimePerInterval = 81 // you can also combine long and short term bollingers (instantiating several ones...)
const minHistoryLength = 36
const relevantHistoryLength = 99
const factor = 3

const monique = await MoniqueBaumann.getInstance()
await monique.play(receiverWallets, sleepTimePerInterval, minHistoryLength, relevantHistoryLength, factor)
```

## Execute Usage Example Advanced
```ts
deno run --allow-read --allow-write https://deno.land/x/freedom_cash/usage-example-advanced.ts
```


## Q&A 
<b>Why don't you create liquidity as an ETH/FreedomCash Tradingpair on Uniswap?</b>  
  
With our approach we reduce gas fees and avoid exchange fees for Freedom Cash investors.
Our pricing approach protects against ponzi like vulnerabilities & drops of the [sell price](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol#L54-L58).


<b>What happens if anyone creates a liquidity pool for Freedom Cash on Uniswap?</b>  
  
People are free to create liquidity pools e.g. with ETH/FreedomCash liquidity on Uniswap. It is just not necessary and not useful.

<b>How is it possible that the sell price never drops?</b>  
  
The sell price of Freedom Cash expressed in Ether and sold via the smart contract can stay as it is or go up. It can never drop.
Please study the [smart contract](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol) and focus on the [getSellPrice](https://github.com/monique-baumann/freedom-cash/blob/main/blockchain/freedom-cash.sol#L54-L58) function.  

## Usage Example Client
There shall be many trustworthy frontends for Freedom Cash.  
Programmers will be able to integrate Freedom Cash as svelte, angular or vue component starting on March 2024.

## Donations
Thanks to [Freedom Cash](https://FreedomCash.org), we are already free.  
If you want to donate, you might consider donating to the [otherparty.co.uk](https://www.otherparty.co.uk/donate-crypto-the-other-party) to ensure people do not need to donate to victims but rather donate successfully to problem solvers.   
  
![direct-democracy](https://github.com/michael-spengler/sleep/assets/145258627/fe97b7da-62b4-4cf6-9be0-7b03b2f3095a)

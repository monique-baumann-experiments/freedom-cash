# Freedom Cash
Freedom Cash Helps Those Who Help Each Other Into Freedom, Fairness, Love and Peace.

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

## Donations
Thanks to [Freedom Cash](https://FreedomCash.org), we are already free.  
If you want to donate, you might consider donating to the [otherparty.co.uk](https://www.otherparty.co.uk/donate-crypto-the-other-party) to ensure people do not need to donate to victims but rather donate successfully to problem solvers.   
  
![direct-democracy](https://github.com/michael-spengler/sleep/assets/145258627/fe97b7da-62b4-4cf6-9be0-7b03b2f3095a)
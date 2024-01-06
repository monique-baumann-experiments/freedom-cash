import { Bollinger } from "https://deno.land/x/freedom_cash/mod.ts";
import { sleep } from "https://deno.land/x/sleep/mod.ts";

const sleepTimePerInterval = 9
const minHistoryLength = 3
const relevantHistoryLength = 99
const factor = 3
const bollinger = await Bollinger.getInstance(relevantHistoryLength)
let repeatXMoreTimes = 9 

while (repeatXMoreTimes > 0) {
    const randomNumber = Math.round((Math.random() * (81 - 9) + 9))
    bollinger.addToPriceHistory(randomNumber)
    const investmentDecision = bollinger.getInvestmentDecision(minHistoryLength, factor)
    console.log("O.K. I will:", investmentDecision)
    await sleep(sleepTimePerInterval)
    repeatXMoreTimes--
}
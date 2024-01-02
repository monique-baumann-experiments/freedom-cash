import { Bollinger } from "./mod.ts";
import { sleep } from "./deps.ts";

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
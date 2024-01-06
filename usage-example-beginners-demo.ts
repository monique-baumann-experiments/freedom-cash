
import { MoniqueDemo } from "https://deno.land/x/freedom_cash/mod.ts"

const sleepTimePerInterval = 3
const minHistoryLength = 3
const relevantHistoryLength = 99
const factor = 3
const monique = await MoniqueDemo.getInstance()
await monique.play(sleepTimePerInterval, minHistoryLength, relevantHistoryLength, factor)
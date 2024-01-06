
import { MoniqueDemo } from "./deno/monique-demo.ts";

const sleepTimePerInterval = 3
const minHistoryLength = 3
const relevantHistoryLength = 99
const factor = 3

const monique = await MoniqueDemo.getInstance()
await monique.play(sleepTimePerInterval, minHistoryLength, relevantHistoryLength, factor)

import { MoniqueBaumann } from "https://deno.land/x/freedom_cash/mod.ts";
const receiverWallets = [ ] // e.g. geocashing wallets / supportive communities wallets etc.
const sleepTimePerInterval = 9
const minHistoryLength = 3
const relevantHistoryLength = 99
const factor = 3
const monique = await MoniqueBaumann.getInstance()
await monique.play(sleepTimePerInterval, minHistoryLength, relevantHistoryLength, factor, receiverWallets)
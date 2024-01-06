
import { MoniqueBaumann } from "./deno/monique-baumann.ts";


const numberOfVolatilityFarmingCycles = 21000000
const receiverWallets = [ // e.g. geocashing wallets / supportive communities wallets etc.

]
const demoMode = false
const monique = await MoniqueBaumann.getInstance()
await monique.play(numberOfVolatilityFarmingCycles, receiverWallets, demoMode)

// import { MoniqueDonor } from "https://deno.land/x/freedom_cash/mod.ts"
import { SteffenDonor } from "./mod.ts"

const steffen = await SteffenDonor.getInstance()

await steffen.donate()
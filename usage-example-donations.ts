
// import { MoniqueDonor } from "https://deno.land/x/freedom_cash/mod.ts"
import { MoniqueDonor } from "./mod.ts"

const monique = await MoniqueDonor.getInstance()

await monique.donate()

// import { MoniqueDonor } from "https://deno.land/x/freedom_cash/mod.ts"
import { MoniqueDonor } from "./mod.ts"

const CULT = 0xf0f9d895aca5c8678f706fb8216fa22957685a13
const freedomLovingCommunity = CULT
const monique = await MoniqueDonor.getInstance()

await monique.donate(freedomLovingCommunity)
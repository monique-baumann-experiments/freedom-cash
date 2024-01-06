
import { MoniqueBaumann } from "./deno/monique-baumann.ts";

const monique = await MoniqueBaumann.getInstance()
await monique.play()
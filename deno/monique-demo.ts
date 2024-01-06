import { Logger, sleep } from "../deps.ts"
import { getLogger, getProvider, getContract, FC } from "./constants-types-infrastructure.ts"
import { Bollinger } from "./bollinger.ts";
import { MoniqueBaumann } from "./monique-baumann.ts";

export class MoniqueDemo extends MoniqueBaumann {

    public static instance

    public static async getInstance(): Promise<void> {
        if (MoniqueBaumann.instance === undefined) {
            const logger = await getLogger()
            const provider = getProvider(logger)
            const contract = await getContract(FC, provider, "./blockchain/freedom-cash-abi.ts")
            MoniqueBaumann.instance = new MoniqueDemo(logger, provider, contract)
        }
        return MoniqueBaumann.instance
    }

    private logger: Logger
    private provider: any
    private contract: any

    protected constructor(logger: Logger, provider: any, contract: any) {
        super(logger, provider, contract)
        this.logger = logger
        this.provider = provider
        this.contract = contract
    }
    public async play(sleepTime: number, minHLength: number, hL: number, factor: number) {
        this.logger.info("Hello Free World")
        await this.stabilizeBuyPriceIncreaseSellPrice(sleepTime, minHLength, hL, factor)
    }

    protected async stabilizeBuyPriceIncreaseSellPrice(sleepTime: number, minHLength: number, hL: number, factor: number) {

        const bollinger = new Bollinger(hL, this.logger)
        const freedomCashRocks = true

        while (freedomCashRocks) { // shall be true until people create and utilize something better
            await this.playRound(bollinger, minHLength, factor)
            await sleep(sleepTime)
        }
    }
    protected async playRound(bollinger: Bollinger, minHistoryLength: number, factor: number) {
        const randomNumber = Math.round((Math.random() * (81 - 9) + 9))
        bollinger.addToPriceHistory(randomNumber)
        const investmentDecision = bollinger.getInvestmentDecision(minHistoryLength, factor)
        this.logger.debug(`O.K. I would: ${investmentDecision}`)
    }
}
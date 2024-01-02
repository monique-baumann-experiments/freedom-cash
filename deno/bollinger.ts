// This code is utilized e.g. to stabilize the buy price and to increase the sell price for Freedom Cash
// https://github.com/monique-baumann/freedom-cash  

import { Logger, IBollingerBands, BollingerBandsService } from "../deps.ts"

export class Bollinger {

    public static instance
    public static logger

    public static async getInstance(relevantHistoryLength: number) {
        if (Bollinger.logger === undefined){
            const minLevelForConsole = 'DEBUG'
            const minLevelForFile = 'WARNING'
            const fileName = "./warnings-errors.txt"
            const pureInfo = true // leaving out e.g. the time info
            Bollinger.logger = await Logger.getInstance(minLevelForConsole, minLevelForFile, fileName, pureInfo)
        }
        return new Bollinger(relevantHistoryLength, Bollinger.logger)
    }

    protected priceHistory: number[]
    protected relevantHistoryLength: number
    protected logger: Logger

    protected constructor(relevantHistoryLength: number, logger: Logger) {
        this.priceHistory = []
        this.relevantHistoryLength = relevantHistoryLength
        this.logger = logger
        this.logger.debug(`creating a bollinger with relevantHistoryLength: ${relevantHistoryLength}`)        
    }

    public addToPriceHistory(price: number): void {
        this.logger.info(`adding ${price} to price history`)
        if (this.priceHistory.length == this.relevantHistoryLength) {
            this.priceHistory.splice(0, 1);
        }
        this.priceHistory.push(price);
        this.logger.debug(`priceHistory: ${this.priceHistory}`)
    }

    public initializePriceHistory(): void {
        this.logger.warning(`initializing price history`)
        this.priceHistory = []
    }

    public getBollingerBands(factor: number): IBollingerBands {
        return BollingerBandsService.getBollingerBands(this.priceHistory, factor)
    }

    public getInvestmentDecision(minHistoryLength: number, factor: number): string {
        if(this.priceHistory.length < minHistoryLength) { 
            this.logger.info(`\n\nWe need to wait ${minHistoryLength - this.priceHistory.length} more intervals.`)
            return "hold" 
        }
        const currentPrice = this.priceHistory[this.priceHistory.length - 1]
        this.logger.info(`\n\ncurrent price: ${currentPrice}`)
        const wouldBuyAt = this.getBollingerBands(factor).lower[this.priceHistory.length - 1]
        this.logger.debug(`wouldBuyAt: ${wouldBuyAt}`)
        const wouldSellAt = this.getBollingerBands(factor).upper[this.priceHistory.length - 1]
        this.logger.debug(`wouldSellAt: ${wouldSellAt}`)
        let investmentDecision
        if (currentPrice <= wouldBuyAt) {
            investmentDecision = "buy"
        } else if (currentPrice >= wouldSellAt) {
            investmentDecision = "sell"
        } else {
            investmentDecision = "hold"
        }
        this.logger.info(`investmentDecision: ${investmentDecision}`)
        return investmentDecision
    }
}
// This code is utilized e.g. to stabilize the buy price and to increase the sell price for Freedom Cash

import { Logger, IBollingerBands, BollingerBandsService } from "../deps.ts"

export class Bollinger {

    protected priceHistory: number[]
    protected relevantHistoryLength: number
    protected logger: Logger

    public constructor(relevantHistoryLength: number, logger: Logger) {
        if (relevantHistoryLength < 3 || relevantHistoryLength > 9999) {
            throw new Error(`you might reconsider your parameterization for relevantHistoryLength`)
        }
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
        if (this.priceHistory.length < minHistoryLength) {
            this.logger.info(`\n\nWe need to wait ${minHistoryLength - this.priceHistory.length} more intervals.`)
            return "hold"
        }
        const currentPrice = this.priceHistory[this.priceHistory.length - 1]
        this.logger.info(`\n\ncurrent price: ${currentPrice}`)
        const wouldBuyAt = this.getBollingerBands(factor).lower[this.priceHistory.length - 1]
        let investmentDecision = "hold"
        if (wouldBuyAt === currentPrice) {
            this.logger.debug(`No volatility yet.`)
        } else {
            this.logger.debug(`wouldBuyAt: ${wouldBuyAt}`)
            const wouldSellAt = this.getBollingerBands(factor).upper[this.priceHistory.length - 1]
            this.logger.debug(`wouldSellAt: ${wouldSellAt}`)
            if (currentPrice <= wouldBuyAt) {
                investmentDecision = "buy"
            } else if (currentPrice >= wouldSellAt) {
                investmentDecision = "sell"
            } 
        }
        this.logger.info(`investmentDecision: ${investmentDecision}`)
        return investmentDecision
    }
}
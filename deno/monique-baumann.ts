import { Logger, ethers, sleep } from "../deps.ts"
import { getLogger, getProvider, getContract, FC } from "./constants-types-infrastructure.ts"
import { Bollinger } from "./bollinger.ts";

export class MoniqueBaumann {

    public static instance

    public static async getInstance(): Promise<void> {
        if (MoniqueBaumann.instance === undefined) {
            const logger = await getLogger()
            const provider = getProvider(logger)
            const contract = await getContract(FC, provider, "./blockchain/freedom-cash-abi.ts")
            MoniqueBaumann.instance = new MoniqueBaumann(logger, provider, contract)
        }
        return MoniqueBaumann.instance
    }

    protected logger: Logger
    protected provider: any
    protected contract: any

    protected constructor(logger: Logger, provider: any, contract: any) {
        this.logger = logger
        this.provider = provider
        this.contract = contract
    }
    public async play(sleepTime: number, minHLength: number, hL: number, factor: number, receiverWallets: string[]) {
        this.logger.info("Hello Free World")
        await this.decentralize(receiverWallets)
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
        const buyPrice = Math.round(ethers.formatUnits(await this.contract.getBuyPrice(BigInt(10 ** 18)), "gwei"))
        bollinger.addToPriceHistory(buyPrice)
        const investmentDecision = bollinger.getInvestmentDecision(minHistoryLength, factor)
        if (investmentDecision === "buy") {
            this.logger.info("Buying FreedomCash")

        } else if (investmentDecision === "sell") {
            this.logger.info("Selling FreedomCash")
        } else {
            this.logger.info("Enjoying stable free currencies :)")
        }
    }
    protected async decentralize(receiverWallets: string[]) {
        for (const wallet of receiverWallets) {
            const amount = Math.round(Math.random() * (18 - 9) + 9)
            const balance = await this.contract.balanceOf(wallet)
            this.logger.debug(balance)
            if (balance === BigInt(0)) {
                this.logger.info(`sending ${amount}`)
                const tx = await this.contract.transfer(wallet, ethers.parseEther(amount.toString()))
                this.logger.debug(tx.hash)
                await tx.wait()
            } else {
                this.logger.warning(`wallet ${wallet} already has ${balance} Freedom Cash`)
            }
        }

    }
    protected async buy() {
        const amountToBeBought = 1
        const amountToBeBoughtInWei = ethers.parseEther(amountToBeBought.toString());
        const buyPrice = Number(await this.contract.getBuyPrice(amountToBeBoughtInWei));
        const cost = amountToBeBought * buyPrice;
        const ethInWallet = BigInt(await this.provider.getBalance(this.provider.getWallet()));
        if (ethInWallet < cost) {
            this.logger.warning(`not enough eth in wallet to volatility farm`);
        } else {
            try {
                let tx = await this.contract.buyFreedomCash(amountToBeBoughtInWei, buyPrice, {
                    value: BigInt(cost)
                });
                this.logger.info(tx.hash)
                await (tx.wait)
            } catch (error) {
                this.logger.error(error)
            }
        }
    }
    protected async sell() {
        const balance = await this.contract.balanceOf(await this.provider.getAddress())
        if (balance < BigInt(10 ** 18)) {
            this.logger.warning(`not enough Freedom Cash in wallet to volatility farm`);
        } else {
            try {
                const sellPrice = await this.contract.getSellPrice();
                let tx = await this.contract.sellFreedomCash(BigInt("1"), sellPrice.toString());
                this.logger.info(tx.hash)
                await (tx.wait)
            } catch (error) {
                this.logger.error(error)
            }
        }
    }
}
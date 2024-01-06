import { Logger, ethers, sleep } from "../deps.ts"
import { getLogger, getProvider, EDataTypes, getContract, FC } from "./constants-types-infrastructure.ts"
import { Bollinger } from "./bollinger.ts";

export class MoniqueBaumann {

    public static instance

    public static async getInstance(interestedIn: EDataTypes[]): Promise<void> {
        if (MoniqueBaumann.instance === undefined) {
            const logger = await getLogger()
            const provider = getProvider(logger)
            const contract = await getContract(FC, provider, "./blockchain/freedom-cash-abi.ts")
            MoniqueBaumann.instance = new MoniqueBaumann(logger, provider, contract, interestedIn)
        }
        return MoniqueBaumann.instance
    }

    private logger: Logger
    private provider: any
    private contract: any
    private interestedIn: EDataTypes[] = []

    protected constructor(logger: Logger, provider: any, contract: any, interestedIn: EDataTypes[]) {
        this.logger = logger
        this.interestedIn = interestedIn
        this.provider = provider
        this.contract = contract
    }
    public async play(numberOfVolatilityFarmingCycles: number, receiverWallets: string[], demoMode: boolean) {
        this.logger.info("Hello Free World")
        await this.decentralize(receiverWallets)
        await this.stabilizeBuyPriceIncreaseSellPrice(numberOfVolatilityFarmingCycles, demoMode)
    }

    private async stabilizeBuyPriceIncreaseSellPrice(numberOfVolatilityFarmingCycles: number, demoMode: boolean) {

        const sleepTimePerInterval = 9
        const minHistoryLength = 3
        const relevantHistoryLength = 99
        const factor = 3
        const bollinger = await Bollinger.getInstance(relevantHistoryLength)
        let repeatXMoreTimes = numberOfVolatilityFarmingCycles

        while (numberOfVolatilityFarmingCycles > 0) {
            if (demoMode) {
                const randomNumber = Math.round((Math.random() * (81 - 9) + 9))
                bollinger.addToPriceHistory(randomNumber)
                const investmentDecision = bollinger.getInvestmentDecision(minHistoryLength, factor)
                this.logger.debug(`O.K. I'm in Demo Mode. I would: ${investmentDecision}`)
            } else {
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
            await sleep(sleepTimePerInterval)
            repeatXMoreTimes--
        }
    }
    private async decentralize(receiverWallets: string[]) {
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
    private async buy() {
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
    private async sell() {
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
import { Logger, ethers } from "../deps.ts"
import { getLogger, getProvider, EDataTypes, getContract, FC } from "./constants-types-infrastructure.ts"

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
    public async play() {
        const wallets = [ // geocashing wallets etc.
          
        ]
        for (const wallet of wallets) {
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
}
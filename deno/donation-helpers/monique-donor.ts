import { Logger, ethers, sleep } from "../../deps.ts"
import { getLogger, getProvider, getContract, FC } from "../constants-types-infrastructure.ts"

export class MoniqueDonor {

    public static instance

    public static async getInstance(): Promise<void> {
        if (MoniqueDonor.instance === undefined) {
            const logger = await getLogger()
            const provider = getProvider(logger)
            const contract = await getContract(FC, provider, "./blockchain/freedom-cash-abi.ts")
            MoniqueDonor.instance = new MoniqueDonor(logger, provider, contract)
        }
        return MoniqueDonor.instance
    }

    protected constructor(protected logger: Logger, protected provider: any, protected contract: any) {
        this.logger = logger
        this.provider = provider
        this.contract = contract
    }

    public async donate() {
        this.logger.debug(`inspired by this poll https://twitter.com/Peer2peerE/status/1743669230090784983 one can randomly donate`)
        while (true) { // awaiting sleep below :)
            const winner = this.getWinner()
            this.logger.info(`winner: ${winner}`)
            const fCBalance = await this.contract.balanceOf(winner)
            if (fCBalance > 0) {
                this.logger.warning(`${winner} already has ${fCBalance} Freedom Cash`)
            } else {
                this.logger.info(`donating 1 Freedom Cash to ${winner}.`)
                const tx = await this.contract.transfer(winner, ethers.parseEther("1"))
                this.logger.debug(tx.hash)
                await sleep(60 * 60)
            }
        }
    }
    public getWinner(): string {
        const potentialAddresses = Deno.readTextFileSync('./deno/donation-helpers/just-addresses.txt').split("\n")
        const randomNumber = Math.round((Math.random() * ((potentialAddresses.length - 1) - 0) + 0))
        return ethers.getAddress((potentialAddresses[randomNumber]).toString())
    }
}
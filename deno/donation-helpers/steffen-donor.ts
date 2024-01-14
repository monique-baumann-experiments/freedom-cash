import { Logger, ethers, sleep } from "../../deps.ts"
import { getLogger, getProvider, getContract, FC } from "../constants-types-infrastructure.ts"

export class SteffenDonor {

    public static instance

    public static async getInstance(): Promise<void> {
        if (SteffenDonor.instance === undefined) {
            const logger = await getLogger()
            const provider = getProvider(logger)
            const contract = await getContract(FC, provider, "./blockchain/freedom-cash-abi.ts")
            SteffenDonor.instance = new SteffenDonor(logger, provider, contract)
        }
        return SteffenDonor.instance
    }
    protected geoCashingDistributionIndex = -1
    protected constructor(protected logger: Logger, protected provider: any, protected contract: any) {
        this.logger = logger
        this.provider = provider
        this.contract = contract
    }

    public async donate() {
        this.logger.debug(`inspired by this poll https://twitter.com/Peer2peerE/status/1743669230090784983 one can randomly donate`)
        while (true) { // awaiting sleep below :)
            const geoCash = this.getGeoCash()
            this.logger.info(`geoCash: ${geoCash}`)
            const fCBalance = await this.contract.balanceOf(geoCash)
            if (fCBalance > 0) {
                this.logger.warning(`${geoCash} already has ${fCBalance} Freedom Cash`)
            } else {
                this.logger.info(`donating 1 Freedom Cash to ${geoCash}.`)
                const tx = await this.contract.transfer(geoCash, ethers.parseEther("1"))
                this.logger.debug(tx.hash)
                await sleep(9*36)
            }
        }
    }
    public getGeoCash(): string {
        const potentialAddresses = Deno.readTextFileSync('./deno/donation-helpers/geo-cashing-community-1.txt').split("\n")
        this.geoCashingDistributionIndex++
        return ethers.getAddress((potentialAddresses[this.geoCashingDistributionIndex]).toString())
    }
}
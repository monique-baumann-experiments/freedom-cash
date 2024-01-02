<script>
	import { ethers } from 'ethers';
	export let contract;
	export let provider;
	export let publicWalletAddressOfVisitor;
	let amountToBeBought = 1;
	async function buyFreedomCash() {
		const amountToBeBoughtInWei = ethers.parseEther(amountToBeBought.toString());
		const buyPrice = Number(await contract.getBuyPrice(amountToBeBoughtInWei));
		const cost = amountToBeBought * buyPrice;
		const ethInWallet = Number(await provider.getBalance(publicWalletAddressOfVisitor).toString());
		if (cost > 99 * 10 ** 15) {
			alert('To further decentralization one cannot invest more than 99 Finney (0.099 Ether).');
		} else if (ethInWallet - cost < 9 * 10 ** 15) {
			alert(
				'Freedom Cash wants to ensure you stay flexible. After this transaction the ETH balance in your wallet would be below 9 Finney. You might enter a lower amount.'
			);
		} else {
			let result = await contract.buyFreedomCash(buyPrice, amountToBeBoughtInWei, {
				value: BigInt(cost)
			});
			console.log(result);
		}
	}
</script>


<p><br /><br></p>
How much Freedom Cash do you want to buy?
<p><br /></p>
<input
	bind:value={amountToBeBought}
	class="myInputField"
	type="number"
	placeholder="e.g. 369 Freedom Cash"
	min="0.1"
	max="999999"
	step="0.1"
/>
<p><br /></p>
<p><br /></p>

{#if amountToBeBought > 0}
	<button class="inside" on:click={() => buyFreedomCash()}>Buy Freedom Cash</button>
{/if}

<style>

</style>

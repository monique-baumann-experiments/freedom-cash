s<script>
	import { onMount } from 'svelte';
	// import { ethers } from 'ethers';
	export let contract;
	
	let amount = 0;
	let sellPrice = 0;

	onMount(async () => {
		sellPrice = await contract.getSellPrice();
	});
	async function sellFreedomCash() {
		try {
			sellPrice = await contract.getSellPrice(); // to be up to date
			let result = await contract.sellFreedomCash(amount.toString(), sellPrice.toString());
			// let result = await contract.sellFreedomCash("13817147682402620449645", "48531453097535");
			console.log(`result: ${result}`);
		} catch (error) {
			alert(error.message);
		}
	}
</script>

<h2 class="text-center">Sell Freedom Cash</h2>
<section class="text-center">
	. <br>
    How much would you like to sell?
	<p><br /></p>

	<input
		bind:value={amount}
		class="myInputField"
		type="number"
		placeholder="your investment e.g. 0.000000009 ETH"
	/>
	<p><br /></p>
	<p><br /></p>

	{#if amount > 0}
		<button class="button" on:click={() => sellFreedomCash()}>Sell Freedom Cash</button>
	{/if}
</section>

<style>

</style>

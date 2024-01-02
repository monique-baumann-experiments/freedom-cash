<script>
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';
	import VotingPowerExplanation from '$components/VotingPowerExplanation.svelte'
	export let contract;
	let investmentCoinAddress = '';
	let investmentAmount = ''; // = 9 GWei
	let buyPrice;

	onMount(async () => {
		// tbd
	});
	async function voteForPublicGood() {
		try {
			const investment = ethers.parseEther(investmentAmount);
			buyPrice = await contract.getBuyPrice(investmentAmount); // to be up to date
			let result = await contract.voteForInvestmentIn(
				ethers.getAddress(investmentCoinAddress),
				buyPrice,
				{ value: investment }
			);
			console.log(`result: ${result}`);
		} catch (error) {
			alert(error.message);
		}
	}
</script>

<main>
	<h2 class="text-center">Public Goods Funding</h2>

	<section class="text-center">
		During presale phase (until the first 9.000.000 Freedom Cash are underway) public goods funding
		is only active for

		<a href="https://www.otherparty.co.uk/donate-crypto-the-other-party" target="_blank"
			>otherparty.co.uk donations</a
		>
		because the
		<a href="https://otherparty.co.uk" target="_blank">otherparty.co.uk</a> inspired Freedom Cash.

		<h4 class="text-center">Examples</h4>

		<p><br /></p>
		If you want us to fund
		<a href="https://etherscan.io/token/0xE90CE7764d8401d19ed3733a211bd3b06c631Bc0" target="_blank"
			>$POD</a
		>, you can enter the smart contract address:
		<a href="https://etherscan.io/token/0xE90CE7764d8401d19ed3733a211bd3b06c631Bc0" target="_blank"
			>0xE90CE7764d8401d19ed3733a211bd3b06c631Bc0</a
		>.
		<VotingPowerExplanation></VotingPowerExplanation>
		<p><br /><br /></p>
		<input
			bind:value={investmentCoinAddress}
			class="myInputField"
			type="text"
			placeholder="Enter Smart Contract Address"
		/>
		<p><br /></p>
		<input
			bind:value={investmentAmount}
			class="myInputField"
			type="text"
			placeholder="enter voting power base amount e.g. 0.009 Ether"
		/>
		<p><br /></p>

		<button class="button inside" on:click={() => voteForPublicGood()}>Send Vote</button>

	</section>
</main>

<style>

</style>

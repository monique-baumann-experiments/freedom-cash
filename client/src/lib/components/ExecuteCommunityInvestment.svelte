<script>
	import { ethers } from 'ethers';

	export let contract;
	export let investmentBudget;

	let investmentAmount = 0.099;

	async function executeCommunityInvestment() {
		try {
			const investmentAmountParsed = ethers.parseEther(investmentAmount.toString());
			alert(investmentAmountParsed);
			let result = await contract.executeCommunityInvestment(investmentAmountParsed)
			console.log(`result: ${result}`);
		} catch (error) {
			alert(error.message);
		}
	}
</script>

<p><br /></p>

<input
	bind:value={investmentAmount}
	class="myInputField"
	type="number"
	placeholder="enter swap amount = min 0.099 Ether max {investmentBudget}"
	min="0.099"
	max="999999"
	step="0.1"
/>
<p><br /></p>
<p><br /></p>

{#if investmentAmount > 0}
	<button class="inside" on:click={() => executeCommunityInvestment()}>Execute Community Investment</button>
{/if}

<style>

</style>

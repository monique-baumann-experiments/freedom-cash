<script>
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';
	import SellFreedomCash from '$components/SellFreedomCash.svelte';
	import PublicGoodsFunding from '$components/PublicGoodsFunding.svelte';
	import InvestIntoFreedomCash from '$components/InvestIntoFreedomCash.svelte';
	import InvestmentBets from '$components/InvestmentBets.svelte';
	import GeoCashing from '$components/GeoCashing.svelte';
	import { smartContractAddress } from '../../constants.ts';
	import FeedbackToVisitor from './FeedbackToVisitor.svelte';
	export let contract;
	export let publicWalletAddressOfVisitor;
	export let provider;

	let playInvestmentBets;
	let investIntoFreedomCash;
	let playGeocashing;
	let playPublicGoodsFunding;
	let sellFreedomCash;
	let balanceInSmartContract;
    let fb = { context: "", message: "" }

	onMount(async () => {
		balanceInSmartContract = ethers.formatEther(
			await contract.balanceOf(smartContractAddress)
		);
	});

</script>

<button class="button" on:click={() => (investIntoFreedomCash = !investIntoFreedomCash)}
	>Invest Into Freedom Cash</button
>
{#if investIntoFreedomCash}
	<InvestIntoFreedomCash {contract} {publicWalletAddressOfVisitor} {provider}
	></InvestIntoFreedomCash>
{/if}
<p><br /></p>

<button on:click={() => (playInvestmentBets = !playInvestmentBets)}>Play Investment Bets</button>
{#if playInvestmentBets}
	<p><br /><br /></p>
	<InvestmentBets {contract}></InvestmentBets>
	<p><br /><br /></p>
{/if}
<p><br /></p>
<button on:click={() => (playPublicGoodsFunding = !playPublicGoodsFunding)}
	>Play Public Goods Funding</button
>
{#if playPublicGoodsFunding}
	<p><br /><br /></p>
	<PublicGoodsFunding {contract}></PublicGoodsFunding>
	<p><br /><br /></p>
{/if}
<p><br /></p>
<button on:click={() => (playGeocashing = !playGeocashing)}>Play GeoCashing</button>
{#if playGeocashing}
	<p><br /><br /></p>
	<GeoCashing {contract}></GeoCashing>
	<p><br /><br /></p>
{/if}

<p><br /></p>

<button class="button" on:click={() => (sellFreedomCash = !sellFreedomCash)}>Sell Freedom Cash</button>
{#if sellFreedomCash}
	<p><br /><br /></p>
	<SellFreedomCash {contract}></SellFreedomCash>
	<p><br /><br /></p>
{/if}

<p><br /></p>


<style>

</style>

<script>
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';
	import SellFreedomCash from '$components/SellFreedomCash.svelte';
	import InvestIntoFreedomCash from '$components/InvestIntoFreedomCash.svelte';
	import { smartContractAddress } from '../../constants.ts';
	import FeedbackToVisitor from './FeedbackToVisitor.svelte';
	export let contract;
	export let publicWalletAddressOfVisitor;
	export let provider;

	let investIntoFreedomCash = false;
	let sellFreedomCash = false;
	let balanceInSmartContract;
	let fb = { context: '', message: '' };

	onMount(async () => {
		balanceInSmartContract = ethers.formatEther(await contract.balanceOf(smartContractAddress));
	});
</script>

{#if investIntoFreedomCash === false}
	<button
		class="button"
		on:click={() => {
			investIntoFreedomCash = true;
		}}>Invest Into Freedom Cash</button
	>
{:else}
	<InvestIntoFreedomCash {contract} {publicWalletAddressOfVisitor} {provider}
	></InvestIntoFreedomCash>
{/if}
<p><br /></p>

{#if sellFreedomCash === false}
	<button class="button" on:click={() => (sellFreedomCash = true)}>Sell Freedom Cash</button>
{:else}
	<p><br /><br /></p>
	<SellFreedomCash {contract}></SellFreedomCash>
	<p><br /><br /></p>
{/if}

<p><br /></p>

<style>
</style>

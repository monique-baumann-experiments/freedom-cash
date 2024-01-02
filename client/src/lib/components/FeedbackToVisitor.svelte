<script>
	import { baseURLScan, smartContractAddress } from '../../constants.ts';
	import { createEventDispatcher } from 'svelte';

	export let message = '';

	const dispatch = createEventDispatcher();
</script>

<p><br /></p>
You can observe your interactions with the
<a href="{baseURLScan}{smartContractAddress}" target="_blank">Freedom Cash</a> Smart Contract
<a href="https://etherscan.io" target="_blank">here on etherscan.io</a>.
<p><br /></p>
{message}

<p><br /></p>
<button class="button inside" on:click={() => dispatch('clickedOK')}>O.K.</button>
<p><br /></p>

<style>
	
</style>

<script>
	import { baseURLScan, smartContractAddress } from '../../constants.ts';
	import { createEventDispatcher } from 'svelte';

	export let message = '';

	const dispatch = createEventDispatcher();
</script>

<p><br /></p>
You can observe your interactions with the
<a href="{baseURLScan}token/{smartContractAddress}#code" target="_blank">Freedom Cash</a> Smart
Contract
<a
	href="{baseURLScan}token/{smartContractAddress}"
	target="_blank">here on zkevm.polygonscan.com</a
>.
<p><br /></p>
{message}

<p><br /></p>
<button class="button inside" on:click={() => dispatch('clickedOK')}>O.K.</button>
<p><br /></p>

<style>
</style>

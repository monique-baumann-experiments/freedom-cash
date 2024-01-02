<script>
import Seo from '$lib/components/Seo.svelte';
import { baseURLScan, smartContractAddress } from '../../constants.ts';
</script>

<Seo title="Freedom Enterprise" />

<div class="text-center">
	<h2>Freedom Enterprise</h2>

	Will be released on March 2024. 
	
	<p><br /><br /></p>
	<div class="center">
		<img class="moniqueImage" src="/monique-baumann.jpeg" alt="" />
	</div>
	<p><br /></p>

	I buy and sell
	<a href="{baseURLScan}{smartContractAddress}" target="_blank">Freedom Cash</a>.
	<i>Monique Baumann</i>
	<p><br /></p>
</div>

<style>
	.moniqueImage {
		width: 450px;
		border-radius: 9%;
	}
</style>


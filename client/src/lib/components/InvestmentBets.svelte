<script>

	import { ethers } from 'ethers';
	import VotingPowerExplanation from '$components/VotingPowerExplanation.svelte'
	export let contract;
	let investmentCoinAddress = '';
	let votingPowerBaseAmount = ''; // = 9 GWei

	async function voteForInvestmentIn() {
		try {
			const investment = ethers.parseEther(votingPowerBaseAmount.toString());

			let result = await contract.voteForInvestmentIn(
				ethers.getAddress(investmentCoinAddress),
				{ value: BigInt(investment) }
			);
			console.log(`result: ${result}`);
		} catch (error) {
			alert(error.message);
		}
	}
</script>

<main>
	<h2 class="text-center">Investment Bets</h2>

	<section class="text-center">
		During presale phase (until the first 9.000.000 Freedom Cash are underway) investment bets are
		only active for
		<a
			href="https://etherscan.io/address/0xf0f9d895aca5c8678f706fb8216fa22957685a13"
			target="_blank">CULT</a
		>,
		<a
			href="https://etherscan.io/address/0xb962c980128e77d87a53ceddcab67d7e26540288"
			target="_blank">Ryoshi</a
		>
		and

		<a href="https://etherscan.io/token/0xE90CE7764d8401d19ed3733a211bd3b06c631Bc0" target="_blank"
			>$POD</a
		>.
		<p><br /></p>
		The communities behind those seem to be the ones who are most dedicated to freedom.

		<h4 class="text-center">Examples</h4>
		If you want us to buy
		<a href="https://coinmarketcap.com/currencies/cult-dao/" target="_blank">$CULT</a>, you can
		enter the smart contract address:
		<a
			href="https://etherscan.io/address/0xf0f9d895aca5c8678f706fb8216fa22957685a13"
			target="_blank">0xf0f9D895aCa5c8678f706FB8216fa22957685A13</a
		>.

		<p><br /></p>
		If you want us to buy
		<a
			href="https://www.geckoterminal.com/eth/pools/0xa5a725ce2ccdc776add4a3468e7d84ec0ddc98ba"
			target="_blank">$Ryoshi</a
		>, you can enter the smart contract address:
		<a
			href="https://etherscan.io/address/0xb962c980128e77d87a53ceddcab67d7e26540288"
			target="_blank">0xB962C980128e77D87a53cedDCAb67D7e26540288</a
		>.

		<p><br /></p>
		If you want us to buy
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
			bind:value={votingPowerBaseAmount}
			class="myInputField"
			type="text"
			placeholder="enter voting power base amount e.g. 0.009 Ether"
		/>
		<p><br /></p>

		<button class="button inside" on:click={() => voteForInvestmentIn()}>Send Vote</button>

	</section>
</main>

<style>

</style>

<script>
	import { onMount } from 'svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { ethers } from 'ethers';
	import VotingPowerExplanation from '$components/VotingPowerExplanation.svelte'
	export let contract;
	let GeocashingWalletAddress;
	let investmentAmount = '';
	let messages = [];
	let messageArray = [];
	let textSent = false;
	let text = '';
	let freedomWallet = '';
	let areMessagesPrepared = false;
	let buyPrice = 0;

	onMount(async () => {

		let messageIndex = Number(await contract.GeocashingWalletCounter());
		messages = [];
		while (messageIndex >= 1) {
			const messagesRawInfo = await contract.geoCaches(messageIndex);
			messageArray = messagesRawInfo.toString().split(',');
			// const text = ethers.decodeBytes32String(messageArray[1])
			const freedomWallet = messageArray[1];
			const text = messageArray[2];
			messages.push({ sender: messageArray[0], freedomWallet: freedomWallet, text: text });
			messageIndex = messageIndex - 1;
		}
		areMessagesPrepared = true;
	});

	async function fillGeoCache() {
		try {
			// await contract.writeMessage(ethers.encodeBytes32String(textToBeSent));
			if (messages.filter((e) => e.freedomWallet === freedomWallet)[0] !== undefined) {
				alert('it seems there is already an entry available for this wallet');
			} else if (messages.filter((e) => e.text === text)[0] !== undefined) {
				alert('it seems there is already an entry available for this text');
			} else {
				const investment = ethers.parseUnits(investmentAmount, 'ether');
				buyPrice = await contract.getBuyPrice(investmentAmount); // to be up to date
				let result = await contract.fillGeoCache(
					ethers.getAddress(GeocashingWalletAddress),
					text,
					buyPrice,
					{ value: investment }
				);
				console.log(`result: ${result}`);
				textSent = true;
			}
		} catch (error) {
			alert(error.message);
		}
	}
</script>

<Seo title="Geocashing meets FreedomCashing Wallet Generator" />

<div class="text-center">
	<h2>Geocashing Wallets</h2>

	Our money is free. So are we.

	<p><br /></p>

	<h4>Online Wallets</h4>

	Just like we can utilize a browser to browse the internet, we can utilize a wallet to interact
	with blockchains.
	<p><br /></p>

	For rather small amounts and in order to interact with blockchains and distributed Apps (dApps),
	it seems ok to use online wallets like<a href="https://metamask.io" target="_blank">metamask.io</a
	>
	and
	<a href="https://sonsofcrypto.com/" target="_blank">sonsofcrypto</a>.
	<p><br /></p>
	For rather big amounts of money and in order to collaborate peer to peer without corrupt and totalitarian
	surveillance people in between we shall rather use offline wallets like paperwallets etc.

	<h4>Offline Wallets</h4>

	<p><br /></p>
	One of the best ways to store your crypto assets are self hosted (only you have the private key), cold
	(not connected to the internet) wallets. You can check the code of our paperwallet generator
	<a href="https://github.com/michael-spengler/paperwallet-generator" target="_blank">here</a>.
	<p><br /></p>
	This is a hobby project with the best of intentions. Please do your own research before moving huge
	amounts.
	<p><br /></p>
	<embed
		src="https://michael-spengler.github.io/paperwallet-generator/"
		width="100%"
		height="810"
	/>

	<p><br /></p>

	<h4>Geocashing meets FreedomCashing</h4>
	<p><br /></p>
	<VotingPowerExplanation></VotingPowerExplanation>
	<input
		bind:value={GeocashingWalletAddress}
		class="myInputField"
		type="text"
		placeholder="Enter Geocashing Wallet Address"
	/>
	<p><br /></p>
	<input
		bind:value={investmentAmount}
		class="myInputField"
		type="text"
		placeholder="enter voting power base amount e.g. 0.009 Ether"
	/>
	<p><br /></p>
	<input
		bind:value={text}
		class="myInputField"
		type="text"
		placeholder="hints about the geocache"
	/>
	<p><br /></p>
	<!-- <input
			bind:value={investmentAmount}
			class="myInputField"
			type="number"
			placeholder="bid price"
		/> -->
	<p><br /></p>

	{#if investmentAmount != ''}
		<button class="button" on:click={() => fillGeoCache()}>Fill Geo Cache with Freedom</button>
	{/if}

	<p><br /><br /></p>

	{#if areMessagesPrepared}
		{#each messages as message}
			{message.sender} <br> added:
			"{message.text}"" <br> to freedom wallet:
			{message.freedomWallet} <br> 

		{/each}
	{/if}
</div>

<style>

</style>

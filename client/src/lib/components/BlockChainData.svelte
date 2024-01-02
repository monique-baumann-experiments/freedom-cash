<script>
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';
	import { smartContractAddress, baseURLScan } from '../../constants.ts';
	import ExecuteCommunityInvestment from '$components/ExecuteCommunityInvestment.svelte';
	export let contract;
	export let publicWalletAddressOfVisitor;
	export let provider;

	let amountOfCoinsInVisitorsWallet;
	let amountOfCoinsInSmartContractItself;
	let readyForDisplay = false;
	let buyPrice;
	let sellPrice;
	let amountOfETHInSmartContract;

	onMount(async () => {
		loadData();
		setInterval(() => {
			loadData();
		}, 9 * 1000);
	});

	async function loadData() {
		const sCBalance = await contract.balanceOf(smartContractAddress);
		amountOfCoinsInSmartContractItself = ethers.formatEther(sCBalance);
		const visitorBalance = await contract.balanceOf(publicWalletAddressOfVisitor);
		amountOfCoinsInVisitorsWallet = ethers.formatEther(visitorBalance);
		const rawBuyPrice = await contract.getBuyPrice(ethers.parseUnits('1', 'ether'));
		buyPrice = ethers.formatUnits(rawBuyPrice.toString(), 'ether');
		try {
			sellPrice = ethers.formatUnits((await contract.getSellPrice()).toString(), 'ether');
		} catch (error) {
			console.log(error.message);
		}

		amountOfETHInSmartContract = ethers.formatUnits(
			(await provider.getBalance(smartContractAddress)).toString(),
			'ether'
		);
		readyForDisplay = true;
	}
</script>

{#if readyForDisplay}
	<table>
		<tr>
			<th>Key</th>
			<th>Value</th>
		</tr>
		<tr>
			<td>Connected Wallet</td>
			<td class="longInfo">{publicWalletAddressOfVisitor}</td>
		</tr>
		<tr>
			<td>Wallet Balance</td>
			<td
				>{amountOfCoinsInVisitorsWallet}
				<a href="{baseURLScan}{smartContractAddress}" target="_blank">Freedom Cash</a></td
			>
		</tr>

		<tr>
			<td>Smart Contract Balance</td>
			<td
				>{amountOfCoinsInSmartContractItself}
				<a href="{baseURLScan}{smartContractAddress}" target="_blank">Freedom Cash</a></td
			>
		</tr>
		<tr>
			<td>Underway</td>
			<td
				>{369369369 - amountOfCoinsInSmartContractItself}
				<a href="{baseURLScan}{smartContractAddress}" target="_blank">Freedom Cash</a></td
			>
		</tr>
		<tr>
			<td>Buy Price</td>
			<td>{buyPrice} Ether</td>
		</tr>
		<tr>
			<td>Guaranteed Minimum Sell Price</td>
			<td>{sellPrice} Ether</td>
		</tr>
		<tr>
			<td>ETH Overall Budget</td>
			<td>{amountOfETHInSmartContract} Ether</td>
		</tr>		
		<tr>
			<td>Smart Contract Address</td>
			<td class="longInfo"
				><a href="{baseURLScan}{smartContractAddress}" target="_blank"
					>{smartContractAddress}</a
				></td
			>
		</tr>
	</table>
{:else}
	... loading data from blockchain ...
{/if}

<style>
	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	td,
	th {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}

	tr:nth-child(even) {
		background-color: #dddddd;
	}
</style>

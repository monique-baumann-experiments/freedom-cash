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
	let GeocashingCandidatesCounter = 0;
	let buyPrice;
	let sellPrice;
	let investmentBudget;
	let publicGoodsFundingBudget;
	let geoCashingBudget;
	let liquidityBudget;
	let amountOfETHInSmartContract;
	let addressOfHighestInvestmentBet;
	let addressOfHighestPublicGoodFundingBet;
	let addressOfHighestGeoCashBet;

	onMount(async () => {
		loadData();
		setInterval(() => {
			loadData();
		}, 9 * 1000);
	});

	async function loadData() {
		// const sCBalance = await contract.balanceOf(smartContractAddress);
		// amountOfCoinsInSmartContractItself = ethers.formatEther(sCBalance);
		// const visitorBalance = await contract.balanceOf(publicWalletAddressOfVisitor);
		// amountOfCoinsInVisitorsWallet = ethers.formatEther(visitorBalance);
		// addressOfHighestInvestmentBet = await contract.getAddressOfHighestSoFar(
		// 	ethers.encodeBytes32String('investmentBet')
		// );
		// addressOfHighestPublicGoodFundingBet = await contract.getAddressOfHighestSoFar(
		// 	ethers.encodeBytes32String('publicGoodsFunding')
		// );
		// addressOfHighestGeoCashBet = await contract.getAddressOfHighestSoFar(
		// 	ethers.encodeBytes32String('geoCashing')
		// );
		// GeocashingCandidatesCounter = await contract.gCCCounter();
		// investmentBudget = ethers.formatUnits((await contract.investmentBudget()).toString(), 'ether');
		// publicGoodsFundingBudget = ethers.formatUnits(
		// 	(await contract.publicGoodsFundingBudget()).toString(),
		// 	'ether'
		// );
		// geoCashingBudget = ethers.formatUnits((await contract.geoCashingBudget()).toString(), 'ether');
		// liquidityBudget = ethers.formatUnits((await contract.liquidityBudget()).toString(), 'ether');
		// const rawBuyPrice = await contract.getBuyPrice(ethers.parseUnits('1', 'ether'));
		// buyPrice = ethers.formatUnits(rawBuyPrice.toString(), 'ether');
		// try {
		// 	sellPrice = ethers.formatUnits((await contract.getSellPrice()).toString(), 'ether');
		// } catch (error) {
		// 	console.log(error.message);
		// }

		// amountOfETHInSmartContract = ethers.formatUnits(
		// 	(await provider.getBalance(smartContractAddress)).toString(),
		// 	'ether'
		// );
		readyForDisplay = true;
	}
</script>

{#if readyForDisplay}
	{#if investmentBudget > 0.099}
		There is enough Investmentbudget for the next community investment. <p><br /></p>
		To save gas fees for voters we let volunteers execute the community investment which means especially
		paying the gas fees to swap ETH from the accumulated investmentBudget within the smart contract to
		the
		<a href="{baseURLScan}{addressOfHighestInvestmentBet}" target="_blank">current winning coin</a>
		for this round.
		<ExecuteCommunityInvestment {contract} {investmentBudget}></ExecuteCommunityInvestment>
		<p><br /></p>
	{/if}
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
			<td>Investment Bets Budget</td>
			<td>{investmentBudget} Ether</td>
		</tr>
		<tr>
			<td>Public Goods Funding Budget</td>
			<td>{publicGoodsFundingBudget} Ether</td>
		</tr>
		<tr>
			<td>GeoCash Budget</td>
			<td>{geoCashingBudget} Ether</td>
		</tr>
		<tr>
			<td>ETH Liquidity Budget</td>
			<td>{liquidityBudget} Ether</td>
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

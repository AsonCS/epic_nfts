/* eslint-disable prettier/prettier */

import { ethers } from 'hardhat'

async function main() {
	const nftContractFactory = await ethers.getContractFactory('MyEpicNFT')
	const nftContract = await nftContractFactory.deploy()
	await nftContract.deployed()
	console.log('Contract deployed to:', nftContract.address)

	// Chama a função.
	let txn = await nftContract.makeAnEpicNFT('sponge_bob')

	// Espera ela ser minerada.
	await txn.wait()

	// Minta outra NFT por diversão.
	txn = await nftContract.makeAnEpicNFT('truck')

	// Espera ela ser minerada.
	await txn.wait()
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})

/* eslint-disable prettier/prettier */

import { ethers } from 'hardhat'

async function main() {
	const nftContractFactory = await ethers.getContractFactory('MyEpicNFT')
	const nftContract = await nftContractFactory.deploy()
	await nftContract.deployed()
	console.log('Contract deployed to:', nftContract.address)

	let nftName = 'Que legal isso!!!'
	// Chama a função.
	let txn = await nftContract.makeAnEpicNFT(nftName)
	// Espera ela ser minerada.
	await txn.wait()
	console.log(`Cunhou NFT #1: ${nftName}`)

	nftName = 'Estou muito feliz!!!'
	// Minta outra NFT por diversão.
	txn = await nftContract.makeAnEpicNFT(nftName)
	// Espera ela ser minerada.
	await txn.wait()
	console.log(`Cunhou NFT #2: ${nftName}`)

	nftName = 'Por isso!!!'
	// Minta outra NFT por diversão.
	txn = await nftContract.makeAnEpicNFT(nftName)
	// Espera ela ser minerada.
	await txn.wait()
	console.log(`Cunhou NFT #3: ${nftName}`)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})

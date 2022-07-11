/* eslint-disable prettier/prettier */

import { ethers } from 'hardhat'

async function main() {
	const [owner, randomPerson] = await ethers.getSigners()
	const nftContractFactory = await ethers.getContractFactory('MyEpicNFT')
	let nftContract = await nftContractFactory.deploy()
	await nftContract.deployed()
	console.log('Contract deployed to:', nftContract.address)

	let nftName = 'Que legal isso!!!'
	// Chama a função.
	let txn = await nftContract.makeAnEpicNFT(nftName)
	// Espera ela ser minerada.
	await txn.wait()
	console.log(`Cunhou NFT #1: ${nftName}`)
	let mintedByUser = await nftContract.getMintedByUser()
	console.log(`User ${owner.address} has ${mintedByUser} minted amount.`)

	nftName = 'Estou muito feliz!!!'
	// Minta outra NFT por diversão.
	txn = await nftContract.makeAnEpicNFT(nftName)
	// Espera ela ser minerada.
	await txn.wait()
	console.log(`Cunhou NFT #2: ${nftName}`)
	mintedByUser = await nftContract.getMintedByUser()
	console.log(`User ${owner.address} has ${mintedByUser} minted amount.`)

	nftName = 'Por isso!!!'
	// Minta outra NFT por diversão.
	txn = await nftContract.makeAnEpicNFT(nftName)
	// Espera ela ser minerada.
	await txn.wait()
	console.log(`Cunhou NFT #3: ${nftName}`)
	mintedByUser = await nftContract.getMintedByUser()
	console.log(`User ${owner.address} has ${mintedByUser} minted amount.`)

	// ----------------
	nftContract = nftContract.connect(randomPerson)

	nftName = 'Estou muito feliz!!!'
	// Minta outra NFT por diversão.
	txn = await nftContract.makeAnEpicNFT(nftName)
	// Espera ela ser minerada.
	await txn.wait()
	console.log(`Cunhou NFT #1: ${nftName}`)
	mintedByUser = await nftContract.getMintedByUser()
	console.log(`User ${randomPerson.address} has ${mintedByUser} minted amount.`)

	nftName = 'Por isso!!!'
	// Minta outra NFT por diversão.
	txn = await nftContract.makeAnEpicNFT(nftName)
	// Espera ela ser minerada.
	await txn.wait()
	console.log(`Cunhou NFT #2: ${nftName}`)
	mintedByUser = await nftContract.getMintedByUser()
	console.log(`User ${randomPerson.address} has ${mintedByUser} minted amount.`)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})

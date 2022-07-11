/* eslint-disable prettier/prettier */

import { ethers } from 'hardhat'

async function main() {
	const [deployer] = await ethers.getSigners()
	const accountBalance = await deployer.getBalance()

	console.log('Deploying contracts with account: ', deployer.address)
	console.log('Account balance: ', accountBalance.toString())

	const nftContractFactory = await ethers.getContractFactory('MyEpicNFT')
	const nftContract = await nftContractFactory.deploy()
	await nftContract.deployed()
	console.log('Contract deployed to:', nftContract.address)

	const nftName = 'Que legal isso!!!'
	// Chama a função.
	const txn = await nftContract.makeAnEpicNFT(nftName)
	// Espera ela ser minerada.
	await txn.wait()
	console.log(`Cunhou NFT #1: ${nftName}`)

	// nftName = 'Estou muito feliz!!!'
	// // Minta outra NFT por diversão.
	// txn = await nftContract.makeAnEpicNFT(nftName)
	// // Espera ela ser minerada.
	// await txn.wait()
	// console.log(`Cunhou NFT #2: ${nftName}`)

	// nftName = 'Por isso!!!'
	// // Minta outra NFT por diversão.
	// txn = await nftContract.makeAnEpicNFT(nftName)
	// // Espera ela ser minerada.
	// await txn.wait()
	// console.log(`Cunhou NFT #3: ${nftName}`)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})

/*
SOME0=MyEpicNFT 1.0
SOME2=Deploying contracts with account:  0x7e4d9Fc4bdec1fe100F60041C372270F0E2eDD97
SOME3=Account balance:  101817120182679665
SOME4=WavePortal address:  0x2CEc99daE90f9EccD492b4a6Cd84Ee4312Bb6A6f

SOME0=MyEpicNFT 2.0
SOME2=Deploying contracts with account:  0x7e4d9Fc4bdec1fe100F60041C372270F0E2eDD97
SOME3=Account balance:  87505760148188785
SOME4=WavePortal address:  0x0a32143CFDd210d1DdA941d9d22A8fA37fbE365B
SOME5=Cunhou NFT #1
SOME6=Cunhou NFT #2
SOME7=Cunhou NFT #3

SOME0=MyEpicNFT 3.0
SOME2=Deploying contracts with account:  0x7e4d9Fc4bdec1fe100F60041C372270F0E2eDD97
SOME3=Account balance:  68838689036186359
SOME4=WavePortal address:  0x65334eea0841B24e9a96bAFa58A7943407074B4B
SOME5=Cunhou NFT #1: Que legal isso!!!
SOME6=Cunhou NFT #2: Estou muito feliz!!!
SOME7=Cunhou NFT #3: Por isso!!!

SOME0=MyEpicNFT 4.0
SOME2=Deploying contracts with account:  0x7e4d9Fc4bdec1fe100F60041C372270F0E2eDD97
SOME3=Account balance:  20609032326788783
SOME4=WavePortal address:  0x7c61f083d7C7CdC5D45CcC36be637b064A991E53
SOME5=Cunhou NFT #1: Que legal isso!!!
*/

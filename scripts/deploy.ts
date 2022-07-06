/* eslint-disable prettier/prettier */

import { ethers } from 'hardhat'

async function main() {const [deployer] = await ethers.getSigners()
	const accountBalance = await deployer.getBalance()

	console.log('Deploying contracts with account: ', deployer.address)
	console.log('Account balance: ', accountBalance.toString())

	const nftContractFactory = await ethers.getContractFactory('MyEpicNFT')
	const nftContract = await nftContractFactory.deploy({
		value: ethers.utils.parseEther('0.01')
	})
	await nftContract.deployed()
	console.log('Contract deployed to:', nftContract.address)

	// Chama a função.
	let txn = await nftContract.makeAnEpicNFT('sponge_bob')

	// Espera ela ser minerada.
	await txn.wait()
	console.log('Cunhou NFT #1')

	// Minta outra NFT por diversão.
	txn = await nftContract.makeAnEpicNFT('truck')

	// Espera ela ser minerada.
	await txn.wait()
	console.log('Cunhou NFT #2')
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
*/

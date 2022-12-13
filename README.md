# The Zinar NFT
This repo holds the codes for the frontend and zinar nft contracts.

## Tech Stack of the Product
The Zinar NFT is built using 
- Solidity for the smart contracts
- Ethers.js for the smart contract interaction with the frontend
- ReactJS for the frontend 
- Alchemy API and SDK to fetch NFT and store NFT metadata on the ReactJS frontend 
- IPFS to save and retrieve the token URI 

## The Use of the Product
Zinar NFTs are asset-backed NFTs that can be minted and staked to earn tokens or used as collateral for crypto loans.
The need to create better use cases for NFTs in the DeFi ecosystem and web3 in general. The Zinar NFT is the first step to bring users closer to NFTs in DeFi in the Zinari ecosystem. We will continue to grow the project and introduce more use cases as we expand.

- Mint Zinar NFTs
- Record referrals
- Stake NFTs to earn token rewards
- Use NFTs to collect loans from a liquidity pool

## Brief Description of the Product 
The Zinar NFT Dapp is made up of two main parts, The Solidity smart contracts that hold the logic for minting, staking, loaning NFTs & referring people, and the react frontend.

The ZinarNFT contract is a contract that allows the creation and sale of non-fungible tokens (NFTs) called "Zinar" on the Ethereum blockchain. The contract is an implementation of the ERC-721 standard and inherits from the ZinarWhitelistRefferal and ZinarSetter contracts. The contract is also a ReentrancyGuard, which means that it prevents reentrant calls. The contract defines a mapping for the URI of each Zinar NFT and uses a counter to generate a unique token ID for each NFT. The contract defines several functions for minting different types of Zinar NFTs, and these functions require that the sale is active and that the caller is either on the whitelist or has a referral. The contract also defines functions for setting the URI of each type of Zinar NFT and for paying referral commissions.

The ZinarNFTStaking contract is a contract that allows users to stake their non-fungible tokens (NFTs) in order to earn rewards. The contract is "Ownable", meaning that it has an owner with special privileges, such as the ability to modify the rewards per hour. The contract also uses the ReentrancyGuard contract to prevent reentrant calls. The contract has a mapping that tracks the staked NFTs and another mapping that tracks the addresses of stakers. The contract also has an array of staker addresses. The contract defines several functions for staking and withdrawing NFTs, as well as for claiming rewards.

The ZinarLoans contract defines a struct called Loan that contains details about a loan, such as the loan ID, the loan principal amount, and the maximum repayment amount. The contract also has several functions that allow borrowers and lenders to interact with the contract, such as applyForLoan(), which allows borrowers to apply for a loan, and acceptLoan(), which allows lenders to accept a loan application and transfer money to the borrower. The contract also has several other functions that allow borrowers to repay their loans and lenders to liquidate a borrower's collateral if they default on their loan.

The react frontend helps users interact with the Zinar contracts. To do this, it incorporates Ethers.js for interacting with the smart contracts and Alchemy for connecting to user wallets and fetching user and contract details. The application also makes use of IPFS to store the NFT media and metadata

# The Zinar NFT

This repo holds the codes for the frontend and zinar nft contracts. 

## Inspiration
The need to create better use cases for NFTs in the DeFi ecosystem and web3 in general. The Zinar NFT is the first step to bring users closer to NFTs in DeFi in the Zinari ecosystem. We will continue to grow the project and introduce more use cases as we expand.

##What it does
The Zinar NFT Dapp is made up of two main parts, The Solidity smart contracts that hold the logic for minting, staking, loaning NFTs & referring people, and the react frontend.

The Minting contract also holds the referral contract which handles the logic for recording referrals and sending referral bonuses whenever a referred address mints one of the NFTs.
The staking contract allows users to stake their NFTs and earn token rewards from them and the loaning contract allows NFT hodlers to use their NFTs as collateral for collecting loans from a Liquidity pool.

The react frontend helps users interact with their contract. To do this, it incorporates Ethers.js for interacting with the smart contracts and Moralis for connecting to user wallets and fetching user and contract details.
The application also makes use of IPFS to store the NFT media and metadata

The application can:
- Mint Zinar NFTs
- Record referrals
- Stake NFTs to earn token rewards
- Use NFTs to collect loans from a liquidity pool

## Challenges we ran into
We had to understand and apply a few DeFi concepts while in the process of writing the staking and loaning contracts. It was not an easy process but we came up with logic that works.

Choosing between using fewer tools for the project or making my work easier, We had to decide if we were going to use the Moralis api to handle function calls to the smart contract or stick with Ethers and only use the Moralis NFT api endpoints.
I’m more conversant with using Ethers.js to make calls to smart contracts, so, I stuck with it.
Hence, we opted for ease of work where we could have used Moralis to handle everything and eliminate the use of ethers.js.
Initially I was going to use the Alchemy api, but since I’m more familiar with the Moralis NFT api and preferred how extensive its endpoints are, it felt like a better option for me.

## Accomplishments that we're proud of
The app is still a work in progress, but it works fine! It’s simple to use and you can own an NFT with great use cases in a few clicks!

## What we learned
We learned to focus on delivering an MVP first. As long as it works and solves the problem it’s intended for, it’s good to go. All other refactoring can come as you scale the app.
The MVP can help the product team receive user feedback as quickly as possible to iterate and improve the product.

Practicing good naming conventions for functions and components helps make the code readable, understandable and allows other experts to drop corrections and improvements where needed.
 
## What's next for Zinar NFT
We will focus on scaling the Dapp, improving on the features, and adding new features based on users' needs.

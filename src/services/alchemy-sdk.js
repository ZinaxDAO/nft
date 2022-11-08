// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy } from "alchemy-sdk";

// Config 
const settings = {
  apiKey: process.env.dev.ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

// Store owner wallet address in a variable 
const ownerAddr = "0x98ebf48964108d46864AF6279CA40BdC8D7DF444";

// Print total NFT count returned in the response:
const nftsForOwner = await alchemy.nft.getNftsForOwner(
    ownerAddr,
    "",
    20,
    [process.env.dev.MINT_NFT_ADDRESS],
    true
);
console.log("number of NFTs found:", nftsForOwner.totalCount);

// Get nft metadata for all NFTs in specified contract address 
for (const nft of nftsForOwner.ownedNfts) {
    const response = await alchemy.nft.getNftMetadata(
    process.env.dev.MINT_NFT_ADDRESS,
    nft.tokenId
    );
}
console.log(response);
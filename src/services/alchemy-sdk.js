// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy } from "alchemy-sdk";

// Config 
const settings = {
  apiKey: process.env.dev.ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

// Print owner's wallet address:
const ownerAddr = "0xshah.eth";
console.log("fetching NFTs for address:", ownerAddr);
console.log("...");

// Print total NFT count returned in the response:
const nftsForOwner = await alchemy.nft.getNftsForOwner("0xshah.eth");
console.log("number of NFTs found:", nftsForOwner.totalCount);
console.log("...");

// Get nft metadata for all NFTs in specified contract address 
for (const nft of nftsForOwner.ownedNfts) {
    const response = await alchemy.nft.getNftMetadata(
    process.env.dev.MINT_NFT_ADDRESS,
    nft.tokenId
    );
}
console.log(response);
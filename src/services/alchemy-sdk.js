import { Network, Alchemy } from "alchemy-sdk";
import { ethers } from "ethers";

// Config
const settings = {
  apiKey: "JP4YR7vEocn0Mx4jMcSuNWTHnLq6cqAS",
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

// Store owner wallet address and NFT contract address in a variable
const ownerAddr = "0x98ebf48964108d46864AF6279CA40BdC8D7DF444";
const contractAddy = "0x161ed8dc509bdae1b7faaad5b48269bc7c283c05";

const fetchNFTsForContract = async () => {
  const nftArray = [];

  // Print total NFT count returned in the response:
  const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr);

  console.log(nftsForOwner);

  for (const nft of nftsForOwner.ownedNfts) {
    let contractAddr = nft.contract.address;
    let token = nft.tokenId;

    if (contractAddr === contractAddy) {
      const response = await alchemy.nft.getNftMetadata(contractAddr, token);

      console.log(contractAddr, token);

      console.log(response);

      await new Promise((r) => setTimeout(r, 2000));

      let name = response.title;
      let token_id = response.tokenId;
      let imagePath = response.media[0].gateway;
      let desc = response.rawMetadata.description;

      console.log(name, token_id, imagePath, desc);

      let nftdata = {
        name: name,
        id: token_id,
        image: imagePath,
        description: desc,
      };

      nftArray.push(nftdata);
    }
  }

  return nftArray;
};

const fetchNativeBalance = async (address) => {
  try {
    const nativeBalanceHex = await alchemy.core.getBalance(address, "latest");
    const nativeBalanceBigNumber = parseInt(nativeBalanceHex._hex, 16);
    const balanceString = nativeBalanceBigNumber.toString();
    const nativeBalance = ethers.utils.formatEther(balanceString);
    console.log(nativeBalance);
    return nativeBalance.slice(0,6); 
  }catch(error) {
    console.log(error);
  }
};

export {fetchNFTsForContract, fetchNativeBalance};
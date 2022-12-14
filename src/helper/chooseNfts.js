import { ethers } from "ethers";
import contractABI from "../utils/ZinarNFTtest.json";

const CONTRACT_ADDRESS = "0x161ed8dc509bdae1b7faaad5b48269bc7c283c05";

const chooseNft = async (nftName, quantity, totalPrice) => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // connect to the contract you want to execute
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractABI.abi,
    signer
  );
  console.log("Accessing wallet to pay gas");

  if (nftName === "0.5 Zinar NFT") {
    try {
      // run mint function
      const mintTx = await contract.mintZinar05(quantity, {
        value: ethers.utils.parseEther(totalPrice),
      });
      const receipt = await mintTx.wait(); // wait for the transaction to be mined
      console.log(receipt);
      // if the contract is mined successfully, do the following:
      if (receipt.status === 1) {
        alert(
          "Zinar NFT minted! https://mumbai.polygonscan.com/tx/" + mintTx.hash
        );
      } else {
        alert("Transaction failed! Please try again");
      }
    } catch (error) {
      console.log(error);
    }
    return;
  } else if (nftName === "1 Zinar NFT") {
    try {
      // run mint function
      const mintTx = await contract.mintZinar1(quantity, {
        value: ethers.utils.parseEther(totalPrice),
      });
      const receipt = await mintTx.wait(); // wait for the transaction to be mined
      console.log(receipt);

      // if the contract is mined successfully, do the following:
      if (receipt.status === 1) {
        alert(
          "Zinar NFT minted! https://mumbai.polygonscan.com/tx/" + mintTx.hash
        );
      } else {
        alert("Transaction failed! Please try again");
      }
    } catch (error) {
      console.log(error);
    }
    return;
  } else if (nftName === "2 Zinar NFT") {
    try {
      // run mint function
      const mintTx = await contract.mintZinar2(quantity, {
        value: ethers.utils.parseEther(totalPrice),
      });
      const receipt = await mintTx.wait(); // wait for the transaction to be mined
      console.log(receipt);

      // if the contract is mined successfully, do the following:
      if (receipt.status === 1) {
        alert(
          "Zinar NFT minted! https://mumbai.polygonscan.com/tx/" + mintTx.hash
        );
      } else {
        alert("Transaction failed! Please try again");
      }
    } catch (error) {
      console.log(error);
    }
    return;
  } else if (nftName === "5 Zinar NFT") {
    try {
      // run mint function
      const mintTx = await contract.mintZinar5(quantity, {
        value: ethers.utils.parseEther(totalPrice),
      });
      const receipt = await mintTx.wait(); // wait for the transaction to be mined
      console.log(receipt);

      // if the contract is mined successfully, do the following:
      if (receipt.status === 1) {
        alert(
          "Zinar NFT minted! https://mumbai.polygonscan.com/tx/" + mintTx.hash
        );
      } else {
        alert("Transaction failed! Please try again");
      }
    } catch (error) {
      console.log(error);
    }
    return;
  } else if (nftName === "10 Zinar NFT") {
    try {
      // run mint function
      const mintTx = await contract.mintZinar10(quantity, {
        value: ethers.utils.parseEther(totalPrice),
      });
      const receipt = await mintTx.wait(); // wait for the transaction to be mined
      console.log(receipt);

      // if the contract is mined successfully, do the following:
      if (receipt.status === 1) {
        alert(
          "Zinar NFT minted! https://mumbai.polygonscan.com/tx/" + mintTx.hash
        );
      } else {
        alert("Transaction failed! Please try again");
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }
};

export default chooseNft;

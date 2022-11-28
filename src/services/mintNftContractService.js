import { ethers } from "ethers";
import contractABI from "C:/Users/user/Desktop/Code/nft/src/utils/ZinarNFTtest.json";
const NFT_CONTRACT_ADDRESS = "0x161ED8dc509bDAE1b7FAaaD5b48269bC7c283c05";

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, contractABI.abi, signer);

let mintPriceArray = [];

const getMintPrice = async() => {
    const zinar05Price = await contract.zinar05price();
    const zinar05PriceString = ethers.utils.formatEther(zinar05Price);

    const zinar1Price = await contract.zinar1price();
    const zinar1PriceString = ethers.utils.formatEther(zinar1Price);


    const zinar2Price = await contract.zinar2price();
    const zinar2PriceString = ethers.utils.formatEther(zinar2Price);


    const zinar5Price = await contract.zinar5price();
    const zinar5PriceString = ethers.utils.formatEther(zinar5Price);


    const zinar10Price = await contract.zinar10price();
    const zinar10PriceString = ethers.utils.formatEther(zinar10Price);

    mintPriceArray.push(zinar05PriceString, zinar1PriceString, zinar2PriceString, zinar5PriceString, zinar10PriceString);

    console.log(mintPriceArray);
}

const setLoanPrincipal = async(name) => {
    await getMintPrice();

    const percentage = name === "5 Zinar" || name === "10 Zinar" ? "0.7" : "0.5";
    console.log(percentage);

    const mintPrice = name === "0.5 Zinar" ? mintPriceArray[0] : 
    name === "1 Zinar" ? mintPriceArray[1] : 
    name === "2 Zinar" ? mintPriceArray[2] :
    name === "5 Zinar" ? mintPriceArray[3] :
    mintPriceArray[4];
    console.log(mintPrice);

    const loanPrincipal = percentage * mintPrice;
    const loanPrincipalString = loanPrincipal.toString();

    const zinar05Principal = Math.floor(Math.random() * (parseInt(mintPriceArray[3]) - parseInt(mintPriceArray[1])) + parseInt(mintPriceArray[1]));

    console.log(zinar05Principal);
    console.log(loanPrincipalString);
    return zinar05Principal;
}

export {getMintPrice, setLoanPrincipal};
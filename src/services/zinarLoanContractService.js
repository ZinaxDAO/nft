import { ethers } from "ethers";
import contractABI from "C:/Users/user/Desktop/Code/nft/src/utils/ZinarLoans.json";
const LOAN_CONTRACT_ADDRESS = "0xc554a98CF397cC2C3b4c4477267405824f3f1548";

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(LOAN_CONTRACT_ADDRESS, contractABI.abi, signer);

let intRateArray = [];

const getInterestRate = async() => {

    const zinar05IntRate = await contract.zinar05InterestRate();
    const zinar05Rate = parseInt(zinar05IntRate._hex).toString();

    const zinar1IntRate = await contract.zinar1InterestRate();
    const zinar1Rate = parseInt(zinar1IntRate._hex).toString();

    const zinar2IntRate = await contract.zinar2InterestRate();
    const zinar2Rate = parseInt(zinar2IntRate._hex).toString();

    const zinar5IntRate = await contract.zinar5InterestRate();
    const zinar5Rate = parseInt(zinar5IntRate._hex).toString();
    
    const zinar10IntRate = await contract.zinar10InterestRate();
    const zinar10Rate = parseInt(zinar10IntRate._hex).toString();

    intRateArray.push(zinar05Rate, zinar1Rate, zinar2Rate, zinar5Rate, zinar10Rate);
    console.log(intRateArray);
}

const setIntRate = async(name) => {
    getInterestRate();

    const intRate = name === "0.5 Zinar" ? intRateArray[0] : 
    name === "1 Zinar" ? intRateArray[1] : 
    name === "2 Zinar" ? intRateArray[2] :
    name === "5 Zinar" ? intRateArray[3] :
    intRateArray[4]

    console.log(intRate);
    return intRate;
}

export{getInterestRate, setIntRate};
import { ethers } from "ethers";
import contractABI from "../utils/ZinarLoans.json";
import nftcontractABI from "../utils/ZinarNFTtest.json";
const LOAN_CONTRACT_ADDRESS = "0x7afd255F3a5223822f1B450d32AB2C353B0cD349";
const NFT_CONTRACT_ADDRESS = "0x161ED8dc509bDAE1b7FAaaD5b48269bC7c283c05";

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

  while (intRateArray.length < 5) {
    intRateArray.push(zinar05Rate, zinar1Rate, zinar2Rate, zinar5Rate, zinar10Rate);
  }
  console.log(intRateArray);
}

const setIntRate = async(name) => {
  await getInterestRate();

  const intRate = name === "0.5 Zinar" ? intRateArray[0] : 
  name === "1 Zinar" ? intRateArray[1] : 
  name === "2 Zinar" ? intRateArray[2] :
  name === "5 Zinar" ? intRateArray[3] :
  intRateArray[4]

  console.log(intRate);
  return intRate;
}

const getAdminFee = async() => {
  const adminFee = await contract.adminFeeInMatic();
  const adminFeeInMatic = adminFee.toString();
  console.log(adminFeeInMatic);

  return adminFeeInMatic;
}

const getApprovalReceipt = async (_nftId) => {
  const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, nftcontractABI.abi, signer);
  try { 
    const approveTx = await nftContract.approve(LOAN_CONTRACT_ADDRESS, _nftId);
    let receipt = approveTx.wait();
    return receipt;
  } catch (error) {
    console.log(error);
  }
}

const takeZinarLoan = async(loanAmount, nftId, InterestRate) => {
  await InterestRate;
  console.log(InterestRate);

  try {
    const approvalReceipt = await getApprovalReceipt(nftId);
    if (!approvalReceipt) {
      return false;
    } else if (approvalReceipt.status === 1) {
      console.log('Accessing wallet to pay gas');
      const takeLoan = await contract.beginLoan(
        loanAmount, 
        nftId, 
        InterestRate, 
        NFT_CONTRACT_ADDRESS,
        {value: getAdminFee(),
          gasPrice: 2000000000
        }
      );
      const receipt = await takeLoan.wait();
  
      if (receipt.status === 1) {
        alert("Loan started! https://mumbai.polygonscan.com/tx/"+takeLoan.hash);
        
      } else {
        alert("Transaction failed! Please try again");
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

const getPayOffAmount = async(loanId) => {
  try {
    const payOffAmountHex = await contract.getPayoffAmount(loanId);
    const payOffAmountBigN = parseInt(payOffAmountHex._hex, 16);
    const payOffAmountString = payOffAmountBigN.toString();
    const payOffAmountParse = ethers.utils.formatEther(payOffAmountString);

    console.log(payOffAmountParse);
    return payOffAmountString;
  } catch (error) {
    console.log(error)
  }  
}

const paybackZinarLoan = async(loanId) => {
  const amountDue = await getPayOffAmount(loanId);
  const adminFee =await getAdminFee();

  const totalAmount = parseInt(amountDue) + parseInt(adminFee);
  console.log (totalAmount);
  const totalAmountString = totalAmount.toString();
  console.log('Accessing wallet to pay gas');
  
  const payLoan = await contract.payBackLoan(
    loanId,
    {value: totalAmountString}
  );
  const receipt = await payLoan.wait();

  if (receipt.status === 1) {
    alert("Loan started! https://mumbai.polygonscan.com/tx/"+payLoan.hash);
    
  } else {
    alert("Transaction failed! Please try again");
  }
}

export {getInterestRate, setIntRate, getAdminFee, takeZinarLoan, getPayOffAmount, paybackZinarLoan};
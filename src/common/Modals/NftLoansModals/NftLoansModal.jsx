import React, {useEffect, useState} from "react";
import "./NftLoansModal.css";
import "../NftModals/NftModals.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ethers } from "ethers";
import contractABI from "../../../utils/ZinarLoans.json";
import nftcontractABI from "../../../utils/ZinarNFTtest.json";
import {fetchNFTsForContract} from "../../../services/alchemy-sdk";
import { setIntRate } from "../../../services/zinarLoanContractService";
import { setLoanPrincipal } from "../../../services/mintNftContractService";

const NftLoansModal = (props) => {
  const LOAN_CONTRACT_ADDRESS = "0xE73207f981F7787170B4fC6C3348D40974974dae";
  const NFT_CONTRACT_ADDRESS = "0x161ED8dc509bDAE1b7FAaaD5b48269bC7c283c05";
  const [zinarNft, setZinarNft] = useState([]);
  const { setNftLoansModal } = props;
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // connect to the contract you want to execute
  const contract = new ethers.Contract(LOAN_CONTRACT_ADDRESS, contractABI.abi, signer);

  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const getNfts = async () => {
    const nftData = await fetchNFTsForContract();
    setZinarNft(nftData);
  };

  useEffect(() => {
    getNfts();
  }, []);

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
    console.log(InterestRate);

    const adminFee = await contract.adminFeeInMatic();
    const adminFeeInMatic = adminFee.toString();
    console.log(adminFeeInMatic);

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
          {value: adminFeeInMatic}
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

  const beginLoan = async() => {
    try {
      zinarNft.forEach((nft) => {
        takeZinarLoan(setLoanPrincipal(nft.name), nft.id, setIntRate(nft.name));
      })
    }catch(error) {
      console.log(error)
    }
  }

  const paybackZinarLoan = async(loanId) => {
    console.log('Accessing wallet to pay gas');

    const adminFee = await contract.adminFeeInMatic();
    const adminFeeInMatic = adminFee.toString();
    console.log(adminFeeInMatic);

    const payLoan = await contract.payBackLoan(
      loanId,
      {value: adminFeeInMatic}
    );
    const receipt = await payLoan.wait();

    if (receipt.status === 1) {
      alert("Loan started! https://mumbai.polygonscan.com/tx/"+payLoan.hash);
      
    } else {
      alert("Transaction failed! Please try again");
    }

  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="closeModalBtn">
          <CancelOutlinedIcon
            onClick={() => setNftLoansModal(false)}
            className="button"
          />
        </div>
        <div className="modalContent">
          <Slider {...settings}>
            {zinarNft.map((nft) => (
              <div className="nftLoansModal">
                <div className="nftLoansModalTitle">{nft.name}</div>
                <div className="nftLoansModalContent">
                <div key={nft.id}>
                  <video autoPlay loop src={nft.image} width={250} height={250}/>
                </div>
                  <div>
                    <div>BUSD Balance</div>
                    <div>NFT ID: {nft.id}</div>
                    <div>Loaned Amount</div>
                    <div>Accrued Interest</div>
                    <button onClick={beginLoan}>Borrow Now</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default NftLoansModal;

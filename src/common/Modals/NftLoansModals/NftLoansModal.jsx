import React from "react";
import "./NftLoansModal.css";
import "../NftModals/NftModals.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import nfts from "../../nfts/nfts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ethers } from "ethers";
import contractABI from "../../../utils/ZinarNFTtest.json"

const NftLoansModal = (props) => {
  const CONTRACT_ADDRESS = "0x161ed8dc509bdae1b7faaad5b48269bc7c283c05";

  const { setNftLoansModal } = props;

  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const zinarLoan = async() => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    // connect to the contract you want to execute
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
    console.log('Accessing wallet to pay gas');

    const takeLoan = await contract.beginLoan();
    const receipt = await takeLoan.wait();

    if (receipt.status === 1) {
      alert("Loan started! https://mumbai.polygonscan.com/tx/"+takeLoan.hash);
      
    } else {
      alert("Transaction failed! Please try again");
    }
  }

  const beginLoan = async() =>{
    try {
      nfts.map((nft) => {
        zinarLoan();
      })
    }catch(error) {
      console.log(error)
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
            {nfts.map((nft) => (
              <div className="nftLoansModal">
                <div className="nftLoansModalTitle">{nft.name}</div>
                <div className="nftLoansModalContent">
                  <div>{nft.image}</div>
                  <div>
                    <div>BUSD Balance</div>
                    <div>Eligible NFT Balance</div>
                    <div>Loaned Amount</div>
                    <div>Accrued Interest</div>
                    <button>Borrow Now</button>
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

import React, { useEffect, useState } from "react";
import "./MintModal.css";
import "../NftModals/NftModals.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import nfts from "./../../nfts/nfts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ethers } from "ethers";
import contractABI from "../../../utils/ZinarNFTtest.json"
import { SuccessAlerts, FailedAlerts } from "../../../utils/alerts";

const MintModal = (props) => {
  const CONTRACT_ADDRESS = '0x161ed8dc509bdae1b7faaad5b48269bc7c283c05';
  const { setMintModal } = props;
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState("");

  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const chooseNft = async(nftName) =>{

    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    // connect to the contract you want to execute
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
    console.log('Accessing wallet to pay gas');
    
    if(nftName === "0.5 Zinar NFT"){
      // run mint function
      const  mintTx= await contract.mintZinar05(quantity, {value: ethers.utils.parseEther(totalPrice)});
      const receipt = await mintTx.wait(); // wait for the transaction to be mined

      // if the contract is mined successfully, do the following:
      if (receipt.status === 1) {
        SuccessAlerts();
        
      } else {
        FailedAlerts();
      }
    }else if(nftName === "1 Zinar NFT"){
      // run mint function
      const mintTx= await contract.mintZinar1(quantity, {value: ethers.utils.parseEther(totalPrice)});
      const receipt = await mintTx.wait(); // wait for the transaction to be mined

      // if the contract is mined successfully, do the following:
      if (receipt.status === 1) {
        alert("Zinar NFT minted! https://mumbai.polygonscan.com/tx/"+mintTx.hash);
        
      } else {
        alert("Transaction failed! Please try again");
      }
    }
    else if(nftName === "2 Zinar NFT"){
    // run mint function
      const mintTx= await contract.mintZinar2(quantity, {value: ethers.utils.parseEther(totalPrice)});
      const receipt = await mintTx.wait(); // wait for the transaction to be mined

      // if the contract is mined successfully, do the following:
      if (receipt.status === 1) {
        alert("Zinar NFT minted! https://mumbai.polygonscan.com/tx/"+mintTx.hash);
        
      } else {
        alert("Transaction failed! Please try again");
      }
    }
  
    else if(nftName === "5 Zinar NFT"){
      // run mint function
      const mintTx= await contract.mintZinar5(quantity, {value: ethers.utils.parseEther(totalPrice)});
      const receipt = await mintTx.wait(); // wait for the transaction to be mined

       // if the contract is mined successfully, do the following:
      if (receipt.status === 1) {
        alert("Zinar NFT minted! https://mumbai.polygonscan.com/tx/"+mintTx.hash);
      } else {
        alert("Transaction failed! Please try again");
      }
    }
  
    else if(nftName === "10 Zinar NFT"){
      // run mint function
      const  mintTx= await contract.mintZinar10(quantity, {value: ethers.utils.parseEther(totalPrice)});
      const receipt = await mintTx.wait(); // wait for the transaction to be mined

      // if the contract is mined successfully, do the following:
      if (receipt.status === 1) {
        alert("Zinar NFT minted! https://mumbai.polygonscan.com/tx/"+mintTx.hash);
        
      } else {
        alert("Transaction failed! Please try again");
      }
    }
  } 

  const mintZinarNft = async () => {

		console.log(totalPrice, quantity);

		try {
      let nftName;
      nfts.map((nft) => {
        nftName = nft.name;
        chooseNft(nftName);
      })
      
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="closeModalBtn">
          <CancelOutlinedIcon
            onClick={() => setMintModal(false)}
            className="button"
          />
        </div>
        <div className="modalContent">
          <Slider {...settings}>
            {nfts.map((nft) => (
              <div className="mintModal">
                <div className="mintModalTitle">{nft.name}</div>
                <div className="mintModalContent">
                  <div>{nft.image}</div>
                  <div>
                    <div>MATIC Balance</div> {/* fetch this using moralis */}
                    <div>{nft.price}</div>
                    <div>
                      <input
                        className="modalInput"
                        type="text"
                        value={quantity}
                        placeholder='Quantity'
                        onChange={e => {setQuantity(e.target.value)
                        const total = e.target.value * nft.price;
                        setTotalPrice(String(total));
                        console.log(typeof totalPrice, typeof quantity);
                        }}
                        
                      />
                    </div> {/* quantity of zinar to mint */}
                    <div>
                      <input
                        className="modalInput"
                        type="text"
                        value={totalPrice}
                        placeholder='Total Price'
                        onChange={e => setTotalPrice(e.target.value)}
                      />
                    </div> {/* nft price * quantity */}
                    <button onClick={mintZinarNft}>MINT NOW</button>
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

export default MintModal;
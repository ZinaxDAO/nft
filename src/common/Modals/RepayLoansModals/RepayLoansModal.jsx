import React, { useEffect, useState } from "react";
import "./RepayLoansModal.css";
import "../NftModals/NftModals.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fetchNFTsForContract from "../../../services/alchemy-sdk";

const NftStakingModal = (props) => {
  const { setNftStakingModal } = props;
  const [ZinarNft, setZinarNft] = useState([]);

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

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="closeModalBtn">
          <CancelOutlinedIcon
            onClick={() => setNftStakingModal(false)}
            className="button"
          />
        </div>
        <div className="modalContent">
          <Slider {...settings}>
            {ZinarNft.map((nft) => (
              <div className="repayLoansModal">
                <div className="repayLoansModalTitle">{nft.name}</div>
                <div className="repayLoansModalContent">
                  <div><video autoPlay loop src={nft.image} width={250} height={250}/></div>
                  <div>
                    <div>MATIC Balance</div>
                    <div>Eligible NFT Balance</div>
                    <div>Token Id: {nft.token_id}</div>
                    <div>Accrued Reward</div>
                    <button>STAKE</button>
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

export default NftStakingModal;

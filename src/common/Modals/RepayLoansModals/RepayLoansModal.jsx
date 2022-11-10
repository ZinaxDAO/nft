import React, { useEffect, useState } from "react";
import "./RepayLoansModal.css";
import "../NftModals/NftModals.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NftStakingModal = (props) => {
  const { setNftStakingModal } = props;
  const [zinarnfts, setZinarnfts] = useState([]);
  const [nftTokenId, setNftTokenId] = useState([]);

  const fetchNFTsForContract = async () => {
    try{

    }catch(error){
      console.log(error);
    }
  }

  const fetchNftId = async () => {

  }

  useEffect(() => {
  }, []);

  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

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
            {zinarnfts.map((nft) => (
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

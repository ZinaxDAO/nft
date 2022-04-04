import React from "react";
import "./MintModal.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import nfts from "./../../nfts/nfts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MintModal = (props) => {
  const { setMintModal } = props;

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
                    <div>BUSD Balance</div>
                    <div>Fixed NFT Price</div>
                    <div>Mint Amount</div>
                    <div>Mint Price</div>
                    <button>MINT NOW</button>
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

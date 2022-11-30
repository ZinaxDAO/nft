import React from "react";
import "../NftModals/NftModals.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import nfts from "./../../nfts/nfts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MintModalBox from "./MintModalBox/MintModalBox";

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
              <MintModalBox
                key={nft}
                nftName={nft.name}
                nftImage={nft.image}
                nftPrice={nft.price}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MintModal;

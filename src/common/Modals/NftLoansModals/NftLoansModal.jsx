import React from "react";
import "./NftLoansModal.css";
import "../NftModals/NftModals.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import nfts from "../../nfts/nfts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NftLoansModal = (props) => {
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

import React, { useEffect, useState } from "react";
import "../NftModals/NftModals.css";
import nfts from "./../../nfts/nfts";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RepayLoanModalBox from "./RepayLoansModalBox/RepayLoan";

const RepayLoansModal = (props) => {
  const { setRepayLoansModal } = props;

  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  useEffect(() => {}, []);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="closeModalBtn">
          <CancelOutlinedIcon
            onClick={() => setRepayLoansModal(false)}
            className="button"
          />
        </div>
        <div className="modalContent">
          <Slider {...settings}>
            {nfts.map((nft) => (
              <RepayLoanModalBox
                key={nft}
                nftName={nft.name}
                nftImage={nft.image}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default RepayLoansModal;

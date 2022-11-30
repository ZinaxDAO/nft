import React, {useEffect, useState} from "react";
import "../NftModals/NftModals.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchNFTsForContract } from "../../../services/alchemy-sdk";
import TakeLoanModalBox from "./NftLoansModalBox/TakeLoan";

const NftLoansModal = (props) => {
  const [zinarNft, setZinarNft] = useState([]);
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
            onClick={() => setNftLoansModal(false)}
            className="button"
          />
        </div>
        <div className="modalContent">
          <Slider {...settings}>
            {zinarNft.map(nft => (
              <TakeLoanModalBox
                key={nft}
                nftName={nft.name}
                nftImage={nft.image}
                nftId={nft.id}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default NftLoansModal;

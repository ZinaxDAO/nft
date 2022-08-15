import React, { useEffect, useState } from "react";
import "./RepayLoansModal.css";
import "../NftModals/NftModals.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import nfts from "../../nfts/nfts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMoralisWeb3Api } from "react-moralis";

const NftStakingModal = (props) => {
  const { setNftStakingModal } = props;
  const Web3Api = useMoralisWeb3Api();
  const [zinarnfts, setZinarnfts] = useState([]);

  const fetchNFTsForContract = async () => {
    const options = {
      chain: "mumbai",
      token_address: "0x35b7505f2ccd3b84c75d52287b68ba0e292a22a1"
    };
    try{
      const znfts = await Web3Api.Web3API.account.getNFTsForContract(options, { cors: true });
      console.log(znfts);
      if (znfts.result){
        const convertMetadata = znfts.result.map((nft) => {
          nft.metadata = JSON.parse(nft.metadata);
          return nft.metadata;
        });

        console.log(convertMetadata);
        
        setZinarnfts(convertMetadata);
      }

    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchNFTsForContract();
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
                    <div>BNB Balance</div>
                    <div>Eligible NFT Balance</div>
                    <div>Loaned Amount</div>
                    <div>Accrued Interest</div>
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

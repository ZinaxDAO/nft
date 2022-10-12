import React, { useEffect, useState } from "react";
import "./RepayLoansModal.css";
import "../NftModals/NftModals.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMoralisWeb3Api } from "react-moralis";

const NftStakingModal = (props) => {
  const { setNftStakingModal } = props;
  const Web3Api = useMoralisWeb3Api();
  const [zinarnfts, setZinarnfts] = useState([]);
  const [nftTokenId, setNftTokenId] = useState([]);

  const fetchNFTsForContract = async () => {
    const options = {
      chain: "bsc testnet",
      token_address: "0x0b2a3188bd937ea1f57d2f9a7d1859ea0c547798"
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

  const fetchNftId = async () => {
    const options = {
      chain: "bsc testnet",
      token_address: "0x0b2a3188bd937ea1f57d2f9a7d1859ea0c547798"
    };
    try{
      const znfts = await Web3Api.Web3API.account.getNFTsForContract(options, { cors: true });
      console.log(znfts);
      if (znfts.result){
        const fetchTokenId = znfts.result.map((nft) => {
          nft.metadata = JSON.parse(nft.metadata);
          return nft.metadata;
        });

        console.log(fetchTokenId);
        setNftTokenId(fetchTokenId);
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

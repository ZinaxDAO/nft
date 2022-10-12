import React, {useEffect, useState} from "react";
import "./MyNfts.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useMoralisWeb3Api } from "react-moralis";
import Slider from "react-slick";

const MyNfts = (props) => {
  const { setShowMyNfts } = props;
  const Web3Api = useMoralisWeb3Api();
  const [zinarnfts, setZinarnfts] = useState([]);

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
        console.log(zinarnfts);
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
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
  };

  return (
    <div className="mynfts">
      <h3>MY NFTs</h3>
      <CancelOutlinedIcon
        className="close-icon"
        onClick={() => setShowMyNfts(false)}
      />
      <hr />
      <div className="nft-collections">
        {zinarnfts ? (
          zinarnfts.map((nft) => <div><video autoPlay loop src={nft.image} width={250} height={250}/></div>)
          ) : (
          <h3 className='dark:text-gray-400 mx-2'>
            No NFTs minted yet
          </h3>
        )}
      </div>
    </div>
  );
};

export default MyNfts;

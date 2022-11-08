import React, {useEffect, useState} from "react";
import "./MyNfts.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Slider from "react-slick";

const MyNfts = (props) => {
  const { setShowMyNfts } = props;
  const [zinarnfts, setZinarnfts] = useState([]);

  const fetchNFTsForContract = async () => {
    
  }

  useEffect(() => {
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

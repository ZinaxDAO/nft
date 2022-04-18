import React from "react";
import "./MyNfts.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import nfts from "../../nfts/nfts";

const MyNfts = (props) => {
  const { setShowMyNfts } = props;

  return (
    <div className="mynfts">
      <h3>MY NFTs</h3>
      <CancelOutlinedIcon
        className="close-icon"
        onClick={() => setShowMyNfts(false)}
      />
      <hr />
      <div className="nft-collections">
        {nfts.map((nft) => (
          <div key={nft.id}>{nft.image}</div>
        ))}
      </div>
    </div>
  );
};

export default MyNfts;

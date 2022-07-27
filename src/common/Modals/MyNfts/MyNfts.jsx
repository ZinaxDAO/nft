import React, {useEffect, useState} from "react";
import "./MyNfts.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import nfts from "../../nfts/nfts";
import { useMoralisWeb3Api } from "react-moralis";

const MyNfts = (props) => {
  const { setShowMyNfts } = props;
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
        console.log(zinarnfts);
      }

    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="mynfts">
      <h3>MY NFTs</h3>
      <CancelOutlinedIcon
        className="close-icon"
        onClick={() => fetchNFTsForContract()}
      />
      <hr />
      <div className="nft-collections">
        {zinarnfts.length > 0 ? (
          zinarnfts.map((nft) =>)
          ) : (
          <h3 className='dark:text-gray-400 mx-2'>
            No Result found. Try "apes"
          </h3>
        )}
      </div>
    </div>
  );
};

export default MyNfts;

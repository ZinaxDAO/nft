import React, {useEffect, useState} from "react";
import "./MyNfts.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
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

  useEffect(() => {
    fetchNFTsForContract();
  }, []);


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

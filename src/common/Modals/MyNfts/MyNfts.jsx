import React, {useEffect, useState} from "react";
import "./MyNfts.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Slider from "react-slick";
import { Network, Alchemy } from "alchemy-sdk";

const MyNfts = (props) => {
  const { setShowMyNfts } = props;
  var nftArray = [];

  const fetchNFTsForContract = async () => {

    // Config 
    const settings = {
      apiKey: "JP4YR7vEocn0Mx4jMcSuNWTHnLq6cqAS",
      network: Network.MATIC_MUMBAI
    };

    const alchemy = new Alchemy(settings);

    // Store owner wallet address and NFT contract address in a variable 
    const ownerAddr = "0x98ebf48964108d46864AF6279CA40BdC8D7DF444";
    const contractAddy = "0x161ed8dc509bdae1b7faaad5b48269bc7c283c05";

    // Print total NFT count returned in the response:
    const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr);

    console.log(nftsForOwner);

    for (const nft of nftsForOwner.ownedNfts) {
      let contractAddr = nft.contract.address;
      let token = nft.tokenId;
      let collection = nft.collection;

      if(contractAddr === contractAddy){
        const response = await alchemy.nft.getNftMetadata(
          contractAddr,
          token
        );

        console.log(contractAddr, token, collection);

        console.log(response);

        await new Promise((r) => setTimeout(r, 2000));

        let name = response.title;
        let token_id = response.tokenId;
        let imagePath = response.media[0].gateway;
        let desc = response.rawMetadata.description;

        console.log(name, token_id, imagePath, desc);

        let nftdata = {
          name: name,
          token_id: token_id,
          image: imagePath,
          description: desc
        }

        nftArray.push(nftdata);
      }
    }
    return (nftArray);
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
        {nftArray ? 
          nftArray.map(nft => {
            return(
              <div><video autoPlay loop src={nft.image} width={250} height={250}/></div>
            )
          }) : (
          <h3 className='dark:text-gray-400 mx-2'>
            No NFTs minted yet
          </h3>
        )}
      </div>
    </div>
  );
};

export default MyNfts;

import React, {useEffect, useState} from "react";
import { useMoralisWeb3Api } from "react-moralis";

const FetchNft = async () => {
    const Web3Api = useMoralisWeb3Api();
    const [zinarnfts, setZinarnfts] = useState([]);

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

export default FetchNft;
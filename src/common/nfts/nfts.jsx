import NftOne from "../../assets/images/nftone.png";
import NftTwo from "../../assets/images/nfttwo.png";
import NftThree from "../../assets/images/nftthree.png";
import NftFour from "../../assets/images/nftfour.png";
import NftFive from "../../assets/images/nftfive.png";

const nfts = [
  {
    name: "0.5 Zinar NFT",
    loanAmount: "$12",
    multiplier: "0.5x",
    backing: "Zinari(ZINA)",
    loanDuration: "7 days",
    penalty: "Decompose",
    image: <img src={NftOne} alt="nft-one" />,
  },
  {
    name: "1 Zinar NFT",
    loanAmount: "$30",
    multiplier: "1x",
    backing: "Zinari(ZINA)",
    loanDuration: "14 days",
    penalty: "Decompose",
    image: <img src={NftTwo} alt="nft-two" />,
  },
  {
    name: "2 Zinar NFT",
    loanAmount: "$72",
    multiplier: "2x",
    backing: "Zinari(ZINA)",
    loanDuration: "14 days",
    penalty: "Decompose",
    image: <img src={NftThree} alt="nft-three" />,
  },
  {
    name: "5 Zinar NFT",
    loanAmount: "$180",
    multiplier: "5x",
    backing: "BUSD",
    loanDuration: "30 days",
    penalty: "Auction",
    image: <img src={NftFour} alt="nft-four" />,
  },
  {
    name: "10 Zinar NFT",
    loanAmount: "$480",
    multiplier: "10x",
    backing: "BUSD",
    loanDuration: "30 days",
    penalty: "Auction",
    image: <img src={NftFive} alt="nft-five" />,
  },
];

export default nfts;

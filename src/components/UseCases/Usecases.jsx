import React, { useState } from "react";
import "./Usecases.css";
// import NFTOne from "../../assets/images/nft1.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NftOne from "../../assets/images/nftone.png";
import NftTwo from "../../assets/images/nfttwo.png";
import NftThree from "../../assets/images/nftthree.png";
import NftFour from "../../assets/images/nftfour.png";
import NftFive from "../../assets/images/nftfive.png";
import nfts from "../../common/nfts/nfts";

const Usecases = () => {
  const [display, setDisplay] = useState(0);

  const nftImages = [
    <img src={NftOne} alt="nft-one" />,
    <img src={NftTwo} alt="nft-two" />,
    <img src={NftThree} alt="nft-three" />,
    <img src={NftFour} alt="nft-four" />,
    <img src={NftFive} alt="nft-five" />,
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    centerMode: true,
    className: "carousel-item",
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          className: "carousel-item",
        },
      },
    ],
  };

  return (
    <div className="usecases" id="mint">
      <div className="usecases-intro">
        <h3>Super Rare and Unique NFTs with</h3>
        <h3>sustainable Use Cases</h3>
      </div>

      <div className="usecases-intro-mobile">
        <h3>Super Rare and Unique</h3>
        <h3>NFTs with sustainable</h3>
        <h3>Use cases</h3>
      </div>

      {display ? (
        <div className="clicked-nft">
          <div className="nft-details">
            <h4>{nfts[display].name}</h4>

            <div>
              <p>Instant Loan:</p>
              <p>{nfts[display].loanAmount}</p>
            </div>
            <div>
              <p>Stacking Multiplier:</p>
              <p>{nfts[display].multiplier}</p>
            </div>
            <div>
              <p>Backing:</p>
              <p>{nfts[display].backing}</p>
            </div>
            <div>
              <p>Loan Duration:</p>
              <p>{nfts[display].loanDuration}</p>
            </div>
            <div>
              <p>Default penalty:</p>
              <p>{nfts[display].penalty}</p>
            </div>

            <button className="usecase-btn">Mint Now</button>
          </div>
          <div className="nft-image">{nftImages[display]}</div>
        </div>
      ) : (
        <div className="clicked-nft">
          <div className="nft-details">
            <h4>{nfts[0].name}</h4>

            <div>
              <p>Instant Loan:</p>
              <p>{nfts[0].loanAmount}</p>
            </div>
            <div>
              <p>Stacking Multiplier:</p>
              <p>{nfts[0].multiplier}</p>
            </div>
            <div>
              <p>Backing:</p>
              <p>{nfts[0].backing}</p>
            </div>
            <div>
              <p>Loan Duration:</p>
              <p>{nfts[0].loanDuration}</p>
            </div>
            <div>
              <p>Default penalty:</p>
              <p>{nfts[0].penalty}</p>
            </div>

            <button className="usecase-btn">Mint Now</button>
          </div>
          <div className="nft-image">
            <img src={NftOne} alt="nft-one" />
          </div>
        </div>
      )}

      <div className="carousel">
        <Slider {...settings}>
          {/* <div>
            {" "}
            {nftList.map((nft) => {
              <img src={nft} alt="nft-image" />;
            })}
          </div> */}
          {nftImages.map((image) => (
            <div
              key={nftImages.indexOf(image)}
              onClick={() => setDisplay(nftImages.indexOf(image))} //set display value to index of nft image on clicking it.
            >
              {image}
            </div>
          ))}

          {/* <div>
            <img src={NftOne} alt="nftone" />
          </div>
          <div>
            <img src={NftTwo} alt="nfttwo" />
          </div>
          <div>
            <img src={NftThree} alt="nftthree" />
          </div>
          <div>
            <img src={NftFour} alt="nftfour" />
          </div> */}
        </Slider>
      </div>
    </div>
  );
};

export default Usecases;

import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NftOne from "../../assets/images/nftone.png";
import NftTwo from "../../assets/images/nfttwo.png";
import NftThree from "../../assets/images/nftthree.png";
import NftFour from "../../assets/images/nftfour.png";
import "./Carousel.css";

const Carousel = (props) => {
  const {} = props;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  // const nftList = [NftOne, NftTwo, NftThree, NftFour];
  return (
    <div className="carousel">
      <Slider {...settings}>
        {/* <div>
            {" "}
            {nftList.map((nft) => {
              <img src={nft} alt="nft-image" />;
            })}
          </div> */}

        <div>
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
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;

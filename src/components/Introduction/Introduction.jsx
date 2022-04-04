import React from "react";
import Navbar from "../../common/Navbar/Navbar";
import "./Introduction.css";
import IntroImg from "../../assets/images/introImg.png";
import IntroBg2 from "../../assets/images/introbg2.png";
import DiamondOne from "../../assets/images/diamond-one.png";
import Cubes from "../../assets/images/cubes.png";
import CubesTwo from "../../assets/images/cubes-two.png";

const Introduction = () => {
  return (
    <div className="introduction">
      <Navbar />
      <div className="intro-content">
        <div className="intro-image">
          <img src={IntroImg} alt="intro-section-nft" />
        </div>

        <div className="intro-text">
          <h3>Collect High </h3>
          <h3>
            Utility <span>Zinar NFTs </span>
          </h3>
          <p>The First Metaverse NFT backed with gold</p>
          <a href="/">
            <button className="intro-btn">Mint Zinar</button>
          </a>
        </div>

        <div className="intro-text-2">
          <h3>Collect </h3>
          <h3>High Utility </h3>
          <h3>
            <span>Zinar NFTs </span>
          </h3>
          <a href="/">
            <button className="intro-btn">Mint Zinar</button>
          </a>
          <p>The First Metaverse NFT </p> <p> backed with gold</p>
        </div>
        {/* 
        <div className="intro-bg-2">
          <img src={IntroBg2} alt="intro-bg-2" />
        </div> */}

        <img src={DiamondOne} alt="diamond-one" className="diamond-one" />
        <img src={Cubes} alt="cubes" className="cubes" />
        <img src={IntroBg2} alt="introbg2" className="intro-bg-2" />
        <img src={CubesTwo} alt="cubes-two" className="cubes-two" />
      </div>
    </div>
  );
};

export default Introduction;

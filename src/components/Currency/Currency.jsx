import React from "react";
import "./Currency.css";
import LiquidityImg from "../../assets/images/liquidity-img.png";
import StakingImg from "../../assets/images/staking-img.png";
import CollateralImg from "../../assets/images/collateral-img.png";
import DiamondTwo from "../../assets/images/diamond-two.png";
import Star from "../../assets/images/star.png";
import DiamondThree from "../../assets/images/diamond-three.png";
import CubesThree from "../../assets/images/cubes-three.png";

const Currency = () => {
  return (
    <div className="currency" id="features">
      <div className="currency-heading">
        <h3>The Metaverse Currency!</h3>
        <p>NFTs backed with real money and Liquidity</p>
      </div>

      <div className="currency-heading-two">
        <p>The Metaverse Currency!</p>
        <p>NFTs backed with real money</p>
        <p> and Liquidity</p>
      </div>

      <div className="currency-content">
        <div className="currency-card">
          <div className="currency-card-img">
            <img src={LiquidityImg} alt="LiquidityImg" />
          </div>
          <h4 className="currency-card-heading">Liquidity</h4>
          <p className="currency-card-content">
            All NFTs are backed with a verifiable amount of money, and can be
            converted back to money instantly. No need to look for buyers
          </p>
        </div>
        <div className="currency-card">
          <div className="currency-card-img">
            <img src={StakingImg} alt="StakingImg" />
          </div>
          <h4 className="currency-card-heading">Staking</h4>
          <p className="currency-card-content">
            NFTs can be staked, to generate instant rewards in ZINAX. Make
            passive income from holding.
          </p>
        </div>
        <div className="currency-card">
          <div className="currency-card-img">
            <img src={CollateralImg} alt="CollateralImg" />
          </div>
          <h4 className="currency-card-heading">Collateral</h4>
          <p className="currency-card-content">
            NFTs can be used as collateral to access instant loans. No paperwork
            needed
          </p>
        </div>
      </div>

      <img src={DiamondTwo} alt="diamond-two" className="diamond-two" />
      <img src={DiamondThree} alt="diamond-three" className="diamond-three" />
      <img src={Star} alt="star" className="star-one" />
      <img src={Star} alt="star" className="star-two" />
      <img src={CubesThree} alt="cubes-three" className="cubes-three" />
    </div>
  );
};

export default Currency;

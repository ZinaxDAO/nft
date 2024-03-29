import React, {useEffect, useState} from "react";
import "./DashboardIntro.css";
import IntroImg from "../../../assets/images/introImg.png";
import IntroBg2 from "../../../assets/images/introbg2.png";
import DiamondOne from "../../../assets/images/diamond-one.png";
import Cubes from "../../../assets/images/cubes.png";
import CubesTwo from "../../../assets/images/cubes-two.png";
import Star from "../../../assets/images/star.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { fetchNativeBalance } from "../../../services/alchemy-sdk";
import { connectWallet } from "../../../services/authentication";

const DashboardIntro = () => {
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('');

  const getNativeBalance = async () => {
    const nativeBalance = await fetchNativeBalance(address);
    setBalance(nativeBalance);
  };

  const getAccount = async () => {
    await connectWallet(setAddress);
  }

  useEffect(() => {
    getAccount(); if (address) {
      getNativeBalance();
    } else {
      console.log("Couldn not retrieve native balance");
    }
  });

  return (
    <div className="dashboard-intro">
      <div className="intro-image">
        <img src={IntroImg} alt="intro-section-nft" />
      </div>

      <div className="intro-text">
        <div>
          <h3>Welcome to the </h3>
          <h3>
            Republic <span>of Zinaria </span>
          </h3>
        </div>

        <div>
          <div>
            <div>
              <img src={Star} alt="star" />
            </div>
            <p className="ref-bonus">$RefBonus+</p>
          </div>

          <div>
            <div>
              { balance ? <h5>{balance} MATIC</h5> : <h5>MATIC BALANCE</h5> }
              { address ? <p>{address.slice(0,8)}...{address.slice(-8)}</p> : <p>Wallet Address</p> }
            </div>
            <div>
              <AccountCircleOutlinedIcon
                className="circleoutlineicon"
                fontSize="large"
              />
            </div>
          </div>
        </div>
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
  );
};

export default DashboardIntro;

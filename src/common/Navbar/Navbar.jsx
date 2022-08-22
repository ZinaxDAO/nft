import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ZinariLogo from "../../assets/images/zinarilogo.png";
import ConnectImg from "../../assets/images/connectImg.png";
import { useMoralis } from "react-moralis";

const Navbar = () => {
  const { authenticate, isAuthenticated, isAuthenticating, authError, user, Moralis } = useMoralis();
  
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      setAddress(user.attributes.ethAddress);
    }
  }, [isAuthenticated]);

  const switchNetworkMumbai = async () => {
    const web3 = await Moralis.enable();
    try {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await web3.currentProvider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881",
                chainName: "Mumbai",
                rpcUrls: ["https://rpc-mumbai.matic.today"],
                nativeCurrency: {
                  name: "Matic",
                  symbol: "Matic",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
              },
            ],
          });
        } catch (error) {
          alert(error.message);
        }
      }
    }
  }

  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img src={ZinariLogo} alt="zinari-logo" />
          </Link>
        </div>

        <div className={`nav-links ${open && "open"}`}>
          <ul>
            <li className="nav-link">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-link">
              <Link to="/#mint">Mint</Link>
            </li>
            <li className="nav-link">
              <Link to="/#features">Features</Link>
            </li>
            <li className="nav-link">
              <Link to="/#team">Team</Link>
            </li>
            <li className="nav-link">
              <Link to="/">Contact</Link>
            </li>
            <li className="nav-link">
                <button className="nav-btn" onClick={() => authenticate()}>
                  {isAuthenticated ? <p> {address.slice(0,4)}...{address.slice(-4)} </p> : <p>Connect</p>}
                  <span>
                    <img src={ConnectImg} alt="connect" />
                  </span>
                </button>
            </li>
          </ul>
          
        </div>

        <div
          className={`nav-toggle ${open && "open"}`}
          onClick={() => setOpen(!open)}
        >
          <div className="bar"></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { networks } from "../../utils/networks";
import ZinariLogo from "../../assets/images/zinarilogo.png";
import ConnectImg from "../../assets/images/connectImg.png";

const Navbar = () => {
  const polygonChainId = "0x13881";
  
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [network, setNetwork] = useState('');

  const connectWallet = async() => {
      try {
          const { ethereum } = window;
  
          if(!ethereum) {
              alert("Get Metamask -> https://metamask.io/");
              return;
          }
  
          // request access to account 
          const accounts = await ethereum.request({method: 'eth_requestAccounts'});
          setCurrentAccount(accounts[0]);
          console.log('Connected', accounts[0]);
      } catch (error) {
          console.log(error);
      }
  }
  
  // Checks if a wallet is connected to the web app
  const checkIfWalletIsConnected = async () => {
      // First make sure user has access to window.ethereum
      const { ethereum } = window;
  
      if (!ethereum) {
          console.log("Make sure you have MetaMask!");
          return;
      } else {
          console.log("We have the ethereum object", ethereum);
      }
  
      // check if we're authorized to access user's wallet
      const accounts = await ethereum.request({ method: 'eth_accounts' });
  
      // if user has more than one authorized account, grab the first one
      if(accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account', account);
          setCurrentAccount(account);
      } else{
          console.log('No authorized account found');
      }
  
      // set the network using the chainId
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      setNetwork(networks[chainId]);
  
      ethereum.on('chainChanged', handleChainChanged);
  
      function handleChainChanged(_chainId){
          window.location.reload();
      }
  }
  
  // switch ethereum networks 
  const switchNetwork = async () => {
      if (window.ethereum) {
          try {  
              // Try to switch to the Mumbai testnet
              await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
              });
          } catch (error) {
              // This error code means that the network we wish to switch to hasn't been added yet
              if (error.code === 4902) { // if the network is not present, then try to add the network to Metamask
                  try {
                      await window.ethereum.request({
                          method: 'wallet_addEthereumChain',
                          params: [
                              {	
                                  chainId: '0x13881',
                                  chainName: 'Polygon Mumbai Testnet',
                                  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                                  nativeCurrency: {
                                          name: "Mumbai Matic",
                                          symbol: "MATIC",
                                          decimals: 18
                                  },
                                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                              },
                          ],
                      });
                  } catch (error) {
                      console.log(error);
                  }
              }
              console.log(error);
          }
      } else {
          // If window.ethereum is not found then MetaMask is not installed
          alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
      } 
  }


  useEffect(() => {
    checkIfWalletIsConnected();
    if(network !== 'Polygon Mumbai Testnet'){
      switchNetwork();
    };
  }, []);

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
                <button className="nav-btn" onClick={connectWallet}>
                  {currentAccount ? <p> {currentAccount.slice(0,4)}...{currentAccount.slice(-4)} </p> : <p>Connect</p>}
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

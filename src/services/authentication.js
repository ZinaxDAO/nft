const connectWallet = async (set) => {
    let account;
    try {
      const { ethereum } = window;
  
      if (!ethereum) {
        alert("Get Metamask -> https://metamask.io/");
        return;
      }
  
      // request access to account
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      console.log("Connected", accounts[0]);
      set(account);
      // return account;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Checks if a wallet is connected to the web app
  const checkIfWalletIsConnected = async (setAccount, setNetwork) => {
    let network;
    const { ethereum } = window;
  
    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  
    // check if we're authorized to access user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });
  
    // if user has more than one authorized account, grab the first one
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account", account);
      setAccount(account);
    } else {
      console.log("No authorized account found");
    }
  
    // set the network using the chainId
    const chainId = await ethereum.request({ method: "eth_chainId" });
    network = chainId;
    setNetwork(network);
    ethereum.on("chainChanged", handleChainChanged);
  
    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  };
  
  // switch ethereum networks
  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }], // Check networks.js for hexadecimal network ids
        });
      } catch (error) {
        // This error code means that the network we wish to switch to hasn't been added yet
        if (error.code === 4902) {
          // if the network is not present, then try to add the network to Metamask
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai Testnet",
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                  nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
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
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };
  
  const getConnectedAccount = async () => {
    let account;
    try {
      const { ethereum } = window;
  
      if (!ethereum) {
        alert("Get Metamask -> https://metamask.io/");
        return;
      }
  
      // request access to account
      const accounts = await ethereum.request({ method: "eth_accounts" });
      account = accounts[0];
      console.log("Wallet Address", accounts[0]);
      return account;
    } catch (error) {
      console.log(error);
    }
  };
  
  export {
    connectWallet,
    checkIfWalletIsConnected,
    switchNetwork,
    getConnectedAccount,
  };
  
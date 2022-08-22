require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/dKgz3Y63oOpd1JkMFrgQYDZ4ABnvuxRO",
      accounts: [],
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: "auto",
      gas: "auto",
      accounts: {mnemonic: process.env.MNEMONIC_KEY}
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic: process.env.MNEMONIC_KEY}
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/JP4YR7vEocn0Mx4jMcSuNWTHnLq6cqAS",
      accounts: [process.env.PRIVATE_KEY]
		}

  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_URL,
  },

  settings: {
    optimizer: {
      enabled: true,
      runs: 2000,
      details: {
        yul: true,
        yulDetails: {
          stackAllocation: true,
          optimizerSteps: "dhfoDgvulfnTUtnIf"
        }
      }
    }
  }
};


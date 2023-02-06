require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_MAINNET_URL,
        // blockNumber: 15760547,
      }
    },
    ganache: {
      url: "http://127.0.0.1:7545"
    },
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL,
      accounts: [
        process.env.GOERLI_PRIVATE_KEY
      ]
    }
  },
  etherscan: {
    apiKey: process.env.GOERLI_API_KEY
  }
};

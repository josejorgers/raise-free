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
        blockNumber: 15760547,
      },
      gasPrice: 514564026652,
    }
  },
  etherscan: {
    apiKey: process.env.GOERLI_API_KEY
  }
};

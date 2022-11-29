require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
  networks: {
    mainnet: {
      url: process.env.MAINNET_URL || '',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    testnet: {
      url: process.env.TESTNET_URL || '',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      timeout: 60000
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  }
};

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  let FunCoin = await ethers.getContractFactory("FunCoin");
  let funCoin = await FunCoin.deploy();

  let Bridge = await ethers.getContractFactory("Bridge");
  let bridge = await Bridge.deploy(funCoin.address);

  console.log("funCoin address: ", funCoin.address);
  console.log("bridge address: ", bridge.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

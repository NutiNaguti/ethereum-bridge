const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("bridge tests", () => {
    let FunCoin;
    let funCoin;

    let Bridge;
    let bridge;

    beforeEach(async () => {
        FunCoin = await ethers.getContractFactory("FunCoin");
        funCoin = await FunCoin.deploy();

        Bridge = await ethers.getContractFactory("Bridge");
        bridge = await Bridge.deploy(funCoin.address);

        [owner, address1] = await ethers.getSigners();
    });

    it("succesful lock", async () => {
        funCoin.connect(address1).mint(address1.address, 10);
        funCoin.connect(address1).approve(bridge.address, 10);
        bridge.connect(address1).lock(10);
        expect(await funCoin.balanceOf(bridge.address)).eql(ethers.BigNumber.from(10));
    });

    it("try to transfer without approve", async () => {
        funCoin.connect(address1).mint(address1.address, 10);
        await expect(bridge.connect(address1).lock(10)).rejectedWith("ERC20: insufficient allowance");
    });

    it("try to transfer with fewer tokens", async () => {
        funCoin.connect(address1).mint(address1.address, 1);
        funCoin.connect(address1).approve(bridge.address, 10);
        await expect(bridge.connect(address1).lock(10)).rejectedWith("ERC20: transfer amount exceeds balance");
    });
});
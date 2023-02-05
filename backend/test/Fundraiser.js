const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { ethers } = require('hardhat');
const { expect } = require("chai");
const { deployFundraiserFixture, MAINNET_TOKENS, getETHWhale, getDAIWhale } = require("./testUtils");

describe("Fundraiser", function () {
  

  describe("Deployment", function () {
    it("Should deploy a Fundraiser", async function () {
      await loadFixture(deployFundraiserFixture);

      await expect(true);
    });

    it("Should create a Fundraise", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      await expect(contract.addFundraising(otherAccount.address)).to.emit(
        contract, "FundraiseCreated").withArgs(0);
    })


    it("Should fund the fundraise with ETH", async function() {
      const { owner, otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      const amount = ethers.utils.parseEther('1');
      const funder = await getETHWhale();

      await contract.addFundraising(otherAccount.address);

      await expect(contract.fund(0, {value: amount})).to.emit(
        contract, 'FundraiseFunded'
      ).withArgs(0, owner.address, contract.address, amount);
    })

    it("Should fund the fundraise with DAI", async function() {
      const { owner, otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      const amount = 1000000000000000000n;
      const funder = await getDAIWhale();
      const daiContract = await ethers.getContractAt('IERC20', MAINNET_TOKENS.DAI);

      await daiContract.connect(funder).approve(contract.address, 1000000000000000000000n);

      const daiBalanceBefore = await daiContract.balanceOf(contract.address);
      await contract.addFundraising(otherAccount.address);
      
      await expect(contract.connect(funder).fundToken(0, MAINNET_TOKENS.DAI, amount)).to.emit(
        contract, 'FundraiseFunded'
        ).withArgs(0, funder.address, MAINNET_TOKENS.DAI, amount);
      
      const daiBalanceAfter = await daiContract.balanceOf(contract.address);

      await expect(BigInt(daiBalanceAfter - daiBalanceBefore)).to.equal(amount);
    })

    it("Should revert fundraise liquidation", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      await contract.addFundraising(otherAccount.address);

      await expect(contract.connect(otherAccount).liquidateFundraising(0)).to.be.revertedWith(
        "Fundraise can only be liquidated by its creator"
      )
    })
    
    it("Should emit FundraiseLiquidated event", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);
      
      await contract.addFundraising(otherAccount.address);

      await expect(contract.liquidateFundraising(0)).to.emit(
        contract, "FundraiseLiquidated"
      ).withArgs(0, otherAccount.address)
    })

    it("Should revert because of already liquidated fundraise", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      await contract.addFundraising(otherAccount.address);
      await contract.liquidateFundraising(0)

      await expect(contract.liquidateFundraising(0)).to.be.revertedWith("Fundraise already liquidated")
    })

    it("Should revert because of withdrawing without permission", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      await expect(contract.connect(otherAccount).withdraw()).to.be.reverted;
    })

    it("Should revert because of no funds to withdraw", async function() {
      const { contract } = await loadFixture(deployFundraiserFixture);

      await expect(contract.withdraw()).to.be.revertedWith("There are no funds to withdraw");
    })

    it("Should withdraw 1 ETH", async function() {
      const { owner, contract } = await loadFixture(deployFundraiserFixture);

      const amount = ethers.utils.parseEther("1");
      await owner.sendTransaction({to: contract.address, value: amount});
      
      const beforeBalance = await ethers.provider.getBalance(owner.address);
      await contract.withdraw();
      const afterBalance = await ethers.provider.getBalance(owner.address);

      const expectedDiff = 999000000000000000n
      
      await expect(BigInt(afterBalance - beforeBalance)).to.be.greaterThan(expectedDiff);

    })

  });
});

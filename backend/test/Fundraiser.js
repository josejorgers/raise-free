const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { ethers } = require('hardhat');
const { expect } = require("chai");
const { deployFundraiserFixture, MAINNET_TOKENS } = require("./testUtils");

describe("Fundraiser", function () {
  

  describe("Deployment", function () {
    it("Should deploy a Fundraiser", async function () {
      await loadFixture(deployFundraiserFixture);

      expect(true);
    });

    it("Should create a Fundraise", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      expect(contract.addFundraising(otherAccount.address)).to.emit(
        contract, "FundraiseCreated").withArgs(1);
    })


    it("Should fund the fundraise", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      const amount = ethers.utils.parseEther('1');
      const assetAddress = MAINNET_TOKENS.ETH;

      expect(contract.connect(otherAccount).fund(1, assetAddress, amount)).to.emit(
        contract, 'FundraiseFunded'
      ).withArgs(1, otherAccount.address, assetAddress, amount);
    })

    it("Should revert fundraise liquidation", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      expect(contract.connect(otherAccount).liquidateFundraising(1)).to.be.revertedWith(
        "Fundraise can only be liquidated by its creator"
      )
    })
    
    it("Should emit FundraiseLiquidated event", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      expect(contract.liquidateFundraising(1)).to.emit(
        contract, "FundraiseLiquidated"
      ).withArgs(otherAccount.address)
    })

    it("Should revert because of already liquidated fundraise", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      expect(contract.liquidateFundraising(1)).to.be.revertedWith("Fundraise already liquidated")
    })

  });
});

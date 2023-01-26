const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { deployFundraiserFixture } = require("./testUtils");

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

    it("Should revert fundraise liquidation", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      expect(contract.connect(otherAccount).liquidateFundraising(1)).to.be.revertedWith(
        "Fundraise can only be liquidated by its creator"
      )
    })
    
    it("Should revert fundraise liquidation", async function() {
      const { otherAccount, contract } = await loadFixture(deployFundraiserFixture);

      expect(contract.liquidateFundraising(1)).to.emit(
        contract, "FundraiseLiquidated"
      ).withArgs(otherAccount.address)
    })
  });
});

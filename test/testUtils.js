// We define a fixture to reuse the same setup in every test.
// We use loadFixture to run this setup once, snapshot that state,
// and reset Hardhat Network to that snapshot in every test.
async function deployFundraiserFixture() {
    
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Fundraiser = await ethers.getContractFactory("Fundraiser");
    const contract = await Fundraiser.deploy();

    return { owner, otherAccount, contract };
}

module.exports = {
    deployFundraiserFixture
}
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

// SOME TOKEN ADDRESSES
const MAINNET_TOKENS = {
    USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    ETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    WBTC: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
}

module.exports = {
    deployFundraiserFixture,
    MAINNET_TOKENS
}
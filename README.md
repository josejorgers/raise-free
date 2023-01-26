# Raising Free

A fundraising dApp

## Setting up the dev environment

Run `yarn` on the root directory to get all the dependencies installed. It will install `hardhat` and other necessary dependencies to develop and test the project.

## Smart Contracts

You can find all the Smart Contracts in the `contracts` directory. Currently, we just have implemented contracts regarding with a simple fundraising process. They are:

- **Fundraise.sol**: With the fields of a fundraise. Our fundraises provide the posibility of receving any possible coin in the network. That's why we have a mapping with the balances of every asset.
- **Fundraiser.sol**: This one controls the creation and liquidation of fundraises. It implements the interface **IFundraiser**.

## Testing

To test the project run `npx hardhat test`

We recommend to read the test to learn how to interact with the Fundraiser contract.

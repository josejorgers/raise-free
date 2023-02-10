# Raising Free

A fundraising dApp

## Projects

This project has a backend, a frontend, and a metadata API. This API is used to store metadata about the fundraisings. Everything is done with Javascript and Solidity for the backend. To install the dependencies of each project you need to run `yarn` on the root directory of that project.

### Backend

It uses `hardhat` for smart contract management. After installing dependencies you need to add a `.env` file with the following variables:

- **ALCHEMY_MAINNET_URL**: Mainnet provider app URL. It doesn't have to be from alchemy.

The following environment variables are just needed if you want to deploy to testnet. If yopu don't, remove the `goerli` network from `hardhat.config.js`.

- **ALCHEMY_GOERLI_URL**: Goerli provider app URL. It doesn't have to be from alchemy.
- **GOERLI_PRIVATE_KEY**
- **GOERLI_API_KEY**: API key for your provider app.

### Metadata API

This is used to store fundraising metadata off-chain. This API is deployed as three AWS Lambda and I use the **Serverless Framework** to manage this lambda functions.

If you want to run the API locally, use the `yarn offline` command.

**Important!**
I use a MongoDB database to store the metadata. You will need to create your own MongoDB database and configure the connection. Currently, I assume you have a secret configured in your AWS account called `raise-free-staging-db`. See line 9 of the `serverless.yml` file. I also assume that the database is called `staging` and that it has a collection named `metadata`.

## Smart Contracts

You can find all the Smart Contracts in the `contracts` directory. Currently, we just have implemented contracts regarding with a simple fundraising process. They are:

- **IFundraiser.sol**: An interface that contain the expected behavior of any `Fundraiser`.
- **Fundraiser.sol**: Controls the creation, liquidation, and funding of fundraises. It also provides read only functions to get info from fundraisings. It implements the interface **IFundraiser**.

## Testing

In the `backend` project run `yarn test`

We recommend to read the test to learn how to interact with the Fundraiser contract.

## Next steps

This is part of the backlog for this project:

- Improve UI/UX
- Add more info functions to the smart contract (get general information from all the fundraisings and not just of one of them, get funders, etc)
- Look for a way to store fundraising metadata via NFTs
- Add the possibility to create an NFT as a proof of funding. This would be the way to monetize the application.

## Contributing

I haven't defined the contribution guidelines yet, but feel free to open an issue explaining any intended contribution.

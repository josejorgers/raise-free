import React from 'react'
import { Link } from 'react-router-dom'
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'

// const CoinbaseWallet = new WalletLinkConnector({
//  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//  appName: "Web3-react Demo",
//  supportedChainIds: [1, 3, 4, 5, 42],
// });

// const WalletConnect = new WalletConnectConnector({
//  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//  bridge: "https://bridge.walletconnect.org",
//  qrcode: true,
// });

const Injected = new InjectedConnector({
 supportedChainIds: [1, 3, 4, 5, 42]
});


const TopNavbar = ({ active, account }) => {
  
  const { activate, deactivate } = useWeb3React();

  const connectButton = <button
                          className="absolute right-0 top-0 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => activate(Injected)}
                        >
                          Connect
                        </button>
  const disconnectButton = <button
                              className="absolute right-0 top-0 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                              onClick={ deactivate }
                            >
                              Disconnect
                            </button>

  const showAddr = (addr) => {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`
  }
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <Link to="/"><img src='/logo.png' alt="" /></Link>
      <div className='flex align-center justify-between w-1/3 mr-20'>
        <Link to="/" className="px-4 text-white hover:bg-gray-700 rounded flex items-center" href="#">Listing</Link>
        <Link to="/create" className="px-4 text-white hover:bg-gray-700 rounded flex items-center" href="#">Create Fundraising</Link>
        <div className="relative w-1/2">
          <div
            className="bg-gray-700 rounded p-2 w-48 text-white overflow-hidden"
          >
            {account ? showAddr(account) : "0x000000000000000"}
          </div>
          { active ? disconnectButton : connectButton }
        </div>
      </div>
    </nav>
  )
}

export default TopNavbar

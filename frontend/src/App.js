import './App.css';
import TopNavbar from './components/topNavbar/topNavbar';
import Listing from './components/listing/listing';
import { Route, Routes } from 'react-router-dom';
import CreateFundraisingForm from './components/createForm/createForm';
import FundraisingDetail from './components/details/details';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { Network, Alchemy } from 'alchemy-sdk';
import { CONTRACT_ADDRESS } from './constants';
import abi from './contracts/Fundraiser.json';

const ID_TO_NETWORK = {
  1: Network.ETH_MAINNET,
  5: Network.ETH_GOERLI
}

function App() {
  
  const { active, chainId, account } = useWeb3React();
  const [ contract, setContract ] = useState(null);
  
  
  useEffect(() => {
    
    if(!chainId)
      return;
    
    console.log("ChainId:", chainId);
    if(!Object.keys(ID_TO_NETWORK).includes(chainId.toString())){
      alert("Please change to one of our available chains: Eth Mainnet and Eth Goerli")
    }

    const f = async() => {
      const config = {
        apiKey: process.env.API_KEY,
        network: ID_TO_NETWORK[chainId]
      }
  
      const alchemy = new Alchemy(config)
  
      const provider = await alchemy.config.getProvider();

      setContract(
        new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider)
      )
    }

    f();
  }, [chainId])

  useEffect(() => {console.log(chainId)}, [chainId])

  return (
    <div className='main-app'>
      <TopNavbar active={active} account={account} />
      <main className='flex flex-col items-center justify-center w-full mt-20'>
        <Routes>
          <Route path="/create" element={<CreateFundraisingForm contract={contract} />} />
          <Route path="/details/:id" element={<FundraisingDetail contract={contract} />} />
          <Route path="/" element={ <Listing /> } />
        </Routes>
      </main>
    </div>
    
  )
}

export default App;

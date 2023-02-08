import './App.css';
import TopNavbar from './components/topNavbar/topNavbar';
import Listing from './components/listing/listing';
import { Route, Routes } from 'react-router-dom';
import CreateFundraisingForm from './components/createForm/createForm';
import FundraisingDetail from './components/details/details';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { WagmiConfig } from 'wagmi';
import { CONTRACT_ADDRESS } from './constants';
import abi from './contracts/Fundraiser.json';
import { client } from './wagmiConfig';


function App() {
  const [ address, setAddress ] = useState(null);
  const [ contract, setContract ] = useState(null);
  const [ provider, setProvider] = useState(null);
  
  
  useEffect(() => {
    
    
  }, [])


  return (
    <WagmiConfig client={ client }>
      <div className='main-app'>
      <TopNavbar address={address} setAddress={setAddress} />
        <main className='flex flex-col items-center justify-center w-full mt-20'>
          <Routes>
            <Route path="/create" element={<CreateFundraisingForm contract={contract} provider={provider} />} />
            <Route path="/details/:id" element={<FundraisingDetail address={address} />} />
            <Route path="/" element={ <Listing  /> } />
          </Routes>
        </main>
      </div>
    </WagmiConfig>
    
  )
}

export default App;

import { Fragment, useEffect, useState } from 'react';

import { abi } from './contracts/Fundraiser.json';

import './App.css';
import TopNavbar from './components/topNavbar/topNavbar';
import Listing from './components/listing/listing';
import { Route, Router, Routes } from 'react-router-dom';
import CreateFundraisingForm from './components/createForm/createForm';
import FundraisingDetail from './components/details/details';


const FUNDRAISER_CONTRACT = "0x000000000000000";

function App() {
  
  return (
    <div className='main-app'>
      <TopNavbar />
      <main className='flex flex-col items-center justify-center w-full mt-20'>
        <Routes>
          <Route path="/create" element={<CreateFundraisingForm />} />
          <Route path="/details/:id" element={<FundraisingDetail />} />
          <Route path="/" element={
            <Listing
            fundraisings={[
              {
                id: 1,
                name: 'F1',
                description: 'D1'
              }
            ]}
          />
          } />
        </Routes>
      </main>
    </div>
    
  )
}

export default App;

import React from 'react'
import { Link } from 'react-router-dom'

const TopNavbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <Link to="/"><img src='/logo.png' /></Link>
      <div className='flex align-center justify-between w-1/3 mr-20'>
        <Link to="/" className="px-4 text-white hover:bg-gray-700 rounded flex items-center" href="#">Listing</Link>
        <Link to="/create" className="px-4 text-white hover:bg-gray-700 rounded flex items-center" href="#">Create Fundraising</Link>
        <div className="relative w-1/2">
          <div
            className="bg-gray-700 rounded p-2 w-48 text-white"
            type="text"
          >0x00000000000</div>
          <button
            className="absolute right-0 top-0 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Connect
          </button>
        </div>
      </div>
    </nav>
  )
}

export default TopNavbar

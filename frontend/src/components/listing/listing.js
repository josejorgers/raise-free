import React from 'react'
import { Link } from 'react-router-dom'

const Listing = ({ fundraisings }) => {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <h1 className="text-2xl font-bold text-black mb-4">Listing</h1>
      <ul className="mt-8 bg-gray-100 rounded p-4 flex flex-col items-center w-1/2">
        {fundraisings.map(fundraising => (
          <li key={fundraising.id} className="my-4 w-3/4">
            <Link to={`/details/${fundraising.id}`}>
              <h2 className="text-gray-900 text-lg font-bold">{fundraising.name}</h2>
              <p className="text-gray-600">{fundraising.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Listing

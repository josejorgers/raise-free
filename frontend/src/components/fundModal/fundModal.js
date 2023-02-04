import React, { useState } from 'react'

const FundModal = ({ onSubmit, onClose }) => {
  const [token, setToken] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ token, amount })
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50">
      <div className="mx-auto my-32 max-w-md bg-white rounded p-4">
        <div className='flex w-full justify-end h-10'>
            <button className='bg-slate-400 rounded-lg text-white text-4xl font-bold h-full w-10 border-radius-25' onClick={onClose}>&times;</button>
        </div>
        <h1 className="text-2xl font-bold text-black mb-4 mt-4">Fund</h1>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="token">
              Token
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              id="token"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Fund
          </button>
        </form>
      </div>
    </div>
  )
}

export default FundModal

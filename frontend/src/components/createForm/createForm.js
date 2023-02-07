import React, { useEffect, useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { CONTRACT_ADDRESS, METADATA_API_URL } from '../../constants'
import { useDebounce } from '../../utils'
import abi from '../../contracts/Fundraiser.json'

const STATUS_CODE = {
  'INIT': 0,
  'SUCCESS': 1,
  'FAIL': 2
}

const CreateFundraisingForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [beneficiary, setBeneficiary] = useState('')
  const debouncedBeneficiary = useDebounce(beneficiary, 500)

  const { config } = usePrepareContractWrite({
    abi: abi.abi,
    address: CONTRACT_ADDRESS,
    args: [debouncedBeneficiary],
    functionName: 'addFundraising'
  })

  const { write } = useContractWrite(config)
  const handleSubmit = event => {
    event.preventDefault()
    
    console.log("Creating...")
    console.log(beneficiary)
    // contract.addFundraising(ethers.getAddress(beneficiary));

    write?.()
  }


  return (
    <form className="bg-gray-100 p-4 rounded w-1/2 items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Create Fundraising</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Title
        </label>
        <input
          className="border border-gray-400 p-2 w-full"
          type="text"
          id="name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="border border-gray-400 p-2 w-full"
          id="description"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Beneficiary
        </label>
        <input
          className="border border-gray-400 p-2 w-full"
          type="text"
          id="name"
          value={beneficiary}
          onChange={event => setBeneficiary(event.target.value)}
        />
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Create
      </button>
    </form>
)}

export default CreateFundraisingForm
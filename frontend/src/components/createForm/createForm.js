import React, { useEffect, useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { CONTRACT_ADDRESS, METADATA_API_URL } from '../../constants'
import { useDebounce } from '../../utils'
import abi from '../../contracts/Fundraiser.json'

const CreateFundraisingForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [started, setStarted] = useState(false);
  const [beneficiary, setBeneficiary] = useState('')
  const debouncedBeneficiary = useDebounce(beneficiary, 500)

  const { config } = usePrepareContractWrite({
    abi: abi.abi,
    address: CONTRACT_ADDRESS,
    args: [debouncedBeneficiary],
    functionName: 'addFundraising'
  })

  const { write, data: id, isSuccess, isLoading } = useContractWrite(config)

  useEffect(() => {

    if(!started) return;

    if(isLoading) return;

    if(!isSuccess) return;

    alert('Fundraising created successfully!')

    const metadataConfig = {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id,
        title: name,
        description
      })
    }

    fetch(`${METADATA_API_URL}create`, metadataConfig)
    .then(res => res.json())
    .then(res => res.message === 'Success')
    .then(success => success ? console.log('Done!') : alert('There was an error adding the metadata!'))
    .catch(err => alert('There was an error adding the metadata!' + err.message))
    setStarted(false)

  }, [id, isSuccess, isLoading, started])

  const handleSubmit = event => {
    event.preventDefault()
    
    console.log("Creating...")
    console.log(beneficiary)
    // contract.addFundraising(ethers.getAddress(beneficiary));


    write?.()
    setStarted(true);
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
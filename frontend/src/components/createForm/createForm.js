import React, { useEffect, useState } from 'react'
import { METADATA_API_URL } from '../../constants'

const STATUS_CODE = {
  'INIT': 0,
  'SUCCESS': 1,
  'FAIL': 2
}

const CreateFundraisingForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [creationStatus, setCreationStatus] = useState(STATUS_CODE['INIT'])

  const handleSubmit = event => {
    event.preventDefault()
    console.log(name, description)
    // TODO: Create the fundraising in the blockchain and get the id

    const id = 0

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
    .then(res => res.message === 'Success' ? setCreationStatus(STATUS_CODE['SUCCESS']) : setCreationStatus(STATUS_CODE['FAIL']))
  }

  useEffect(() => {
    // TODO: do something with creation status
  }, [creationStatus])

  return (
    <form className="bg-gray-100 p-4 rounded w-1/2 items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Create Fundraising</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
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
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Create
      </button>
    </form>
)}

export default CreateFundraisingForm
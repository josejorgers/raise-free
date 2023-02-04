import React, { useState } from 'react'

const CreateFundraisingForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [goal, setGoal] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    // Your code to submit the form data
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded w-1/2 items-center justify-center">
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
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Create
      </button>
    </form>
)}

export default CreateFundraisingForm
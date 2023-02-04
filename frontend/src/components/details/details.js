import React, { useEffect, useState } from 'react'
import FundModal from '../fundModal/fundModal'

const FundraisingDetail = ({ id, onFund }) => {

    const [title, setTitle] = useState("F1")
    const [desc, setDesc] = useState('D1')

    useEffect(() => {
        // TODO: Retrieve title and description from id
    }, [])

    const [showModal, setShowModal] = useState(false)

    const handleFundClick = () => {
        setShowModal(true)
    }

    const handleModalClose = () => {
        setShowModal(false)
    }


    return (
        <div className="mt-8 bg-gray-100 rounded p-4 flex flex-col items-center w-1/2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="my-4">{desc}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleFundClick}>
            Fund
            </button>
            {showModal && (
                <FundModal
                    onSubmit={(fundDetails) => {
                        console.log('Funding details:', fundDetails)
                        handleModalClose()
                    }}
                    onClose={handleModalClose}
                />
            )}
        </div>
)}

export default FundraisingDetail

import React, { useEffect, useState } from 'react'
import { erc20ABI, goerli, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { CONTRACT_ADDRESS, METADATA_API_URL } from '../../constants'
import FundModal from '../fundModal/fundModal'
import abi from '../../contracts/Fundraiser.json';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import { useDebounce } from '../../utils';

const FundraisingDetail = ({ address }) => {

    const { id } = useParams();
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [fundAmount, setFundAmount] = useState('0.00001')
    const debouncedFundAmount = useDebounce(fundAmount, 500)
    const [token, setToken] = useState('')


    const { data, isError, isLoading, error } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: abi.abi,
        functionName: 'getFundraisingCreator',
        args: [id],
        chainId: goerli.id,
    })

    const { data: assetData, isError: assetError, isLoading: assetLoading, error: assetErrorData } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: abi.abi,
        functionName: 'getFundraisingAssets',
        args: [id],
        chainId: goerli.id,
    })

    const { config: approveConfig } = usePrepareContractWrite({
        address: token,
        functionName: 'approve',
        abi: erc20ABI,
        args: [
            CONTRACT_ADDRESS,
            ethers.utils.parseEther(fundAmount)
        ]
    })

    const { write: approveWrite, isSuccess } = useContractWrite(approveConfig)


    const { config: fundConfig } = usePrepareContractWrite({
        address: CONTRACT_ADDRESS,
        abi: abi.abi,
        functionName: 'fund',
        args: [id],
        overrides: {value: ethers.utils.parseEther(debouncedFundAmount)}
    })

    const { config: fundTokenConfig } = usePrepareContractWrite({
        address: CONTRACT_ADDRESS,
        abi: abi.abi,
        functionName: 'fundToken',
        args: [
            id,
            token,
            ethers.utils.parseEther(debouncedFundAmount)
        ],
    })

    const { config: liquidateConfig } = usePrepareContractWrite({
        address: CONTRACT_ADDRESS,
        abi: abi.abi,
        functionName: 'liquidateFundraising',
        args: [id]
    })

    const { write: fundWrite } = useContractWrite(fundConfig)
    const { write: liquidateWrite } = useContractWrite(liquidateConfig)
    const { write: fundTokenWrite } = useContractWrite(fundTokenConfig)

    useEffect(() => {
        isSuccess && fundTokenWrite?.()
    }, [isSuccess, fundTokenWrite])

    const metadataConfig = {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ id: parseInt(id) })
    }

    useEffect(() => {
        (async () => {
            let res = await fetch(`${METADATA_API_URL}find`, metadataConfig)
            res = await res.json()
            console.log("FIND:", res);
            setTitle(res.result[0].title)
            setDesc(res.result[0].description)
        })();

        // fetch(`${METADATA_API_URL}find`, metadataConfig)
        // .then(res => res.json())
        // .then(res => {
        //     setTitle(res.result[0].title)
        //     setDesc(res.result[0].description)
        // })
        
        (assetLoading || isLoading) && console.log("Loading")
        (assetError || isError) && console.log(error, '....', assetErrorData)
        assetData && console.log("ASSET:", assetData)
         
    }, [isLoading, isError, error, id, assetLoading, assetError, assetErrorData, assetData])

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
            {
                data &&
                <div className='mt-5 mb-5'>
                    <b>Creator:</b> {data}
                </div>
            }
            {
                assetData &&
                <ul className='mt-5 mb-5'>
                    {
                        assetData[0].map((d, i) => {
                            return <li key={i}>
                                <b>{d === CONTRACT_ADDRESS ? 'Native' : d.substring(0, 8)}:</b> {ethers.utils.formatEther(assetData[1][i])}
                            </li>
                        })
                    }
                </ul>
            }
            <button disabled={!fundWrite} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2" onClick={handleFundClick}>
                Fund
            </button>
            {
                address === data &&
                <button disabled={!liquidateWrite} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2" onClick={() => liquidateWrite?.()}>
                    Liquidate
                </button>
            }
            {showModal && (
                <FundModal
                    setFundAmount={setFundAmount}
                    fundAmount={fundAmount}
                    onSubmitWithToken={() => {
                        approveWrite?.()
                        handleModalClose()
                    }}
                    onSubmit={() => {
                        fundWrite?.(id)
                        handleModalClose()
                    }}
                    onClose={handleModalClose}
                    token={token}
                    setToken={setToken}
                />
            )}
        </div>
)}

export default FundraisingDetail




'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import { useScaffoldEventHistory, useScaffoldWriteContract } from '~~/hooks/scaffold-eth';
import { formatEther, parseEther } from 'viem';
import { useRouter } from 'next/navigation';







const flights = () => {
    const [loading, setLoading] = useState(false);
    
    const {
        data: events,
        isLoading: isLoadingEvents,
        error: errorReadingEvents,
    } = useScaffoldEventHistory({
        contractName: "YourContract",
        eventName: "createTicketEvent",
        fromBlock: 0n || 0n,
        watch: true,
        blockData: true,
        transactionData: true,
        receiptData: true,
    });

    const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");

    const router = useRouter();

    




    return (
        <>
            <div className='bg-blue-500 h-48 flex items-center justify-center text-center'>
                <Image src="/plane.png" alt="flight" width={300} height={400} />
            </div>

            <ul className="steps my-5">
                <li className="step step-primary dark:step-warning">Search ticket</li>
                <li className="step step-primary dark:step-warning">Select Ticket</li>
                <li className="step">Purchase</li>
            </ul>

            <div className="toast my-10">
                <div className="alert alert-error text-center">
                    <span>Unfortunately,
                        <br />We have limited flights!</span>
                </div>
            </div>





            <div className="space-y-5">
                {events?.map((event, index) => (
                    <div key={index} className="collapse collapse-arrow bg-base-100 border p-4 rounded-3xl shadow-lg mt-10 mx-auto max-w-6xl">
                        <input type="checkbox" className="peer" id={`collapse-${index}`} />
                        <div className="collapse-title bg-base-100 mx-auto cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-16">
                                    <div>
                                        <div className="text-xl font-bold">{event.args._from}</div>
                                        <div className="text-gray-600 dark:text-white">{event.args._date}</div>
                                    </div>
                                    <div className="text-center pl-16">
                                        <div>Direct Flight</div>
                                    </div>
                                    <div className="text-center pl-16">
                                        <div className="text-xl font-bold">{event.args._to}</div>
                                        <div className="text-gray-600 dark:text-white">{event.args._flightCode}</div>

                                    </div>
                                </div>
                                <div className="flex items-center pl-24">
                                    <div className="text-xl font-bold">Starts from {formatEther((event.args._price) || 0n)} ETH</div>
                                </div>
                            </div>
                        </div>
                        <div className="collapse-content text-primary-content mt-2">
                            <div className='flex items-center justify-center'>
                                <div className='h-1/2 mx-5'>
                                    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg">
                                        <Image src={"/fly1.jpg"} alt="Luggage1" width={400} height={200} />
                                        <div className="p-4">
                                            <h2 className="text-xl font-bold text-center dark:text-white">Promo Economy</h2>
                                            <ul className="mt-4 space-y-4 text-gray-600">
                                                <li className="flex items-center">
                                                    <svg
                                                        className="w-6 h-6 text-gray-500 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M9 17v-5a3 3 0 016 0v5m-7-3h8m-5 3h2m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <span>1 piece of cabin baggage</span>
                                                    <span className="text-gray-400 ml-2">(55x40x20 cm, 8 kg)</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <svg
                                                        className="w-6 h-6 text-gray-500 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 4v16m-8-8h16"
                                                        />
                                                    </svg>
                                                    <span>1 Piece of Underseat Bag</span>
                                                    <span className="text-gray-400 ml-2">(40x30x15 cm, 3 kg)</span>
                                                </li>


                                                <li className="flex items-center">
                                                    <svg
                                                        className="w-6 h-6 text-gray-500 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 11c0 2.21-3 4-3 4s-3-1.79-3-4a3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    <span>10 Kg Check-in Baggage</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <button className="bg-yellow-400 p-4 text-center text-white font-bold w-full" onClick={async () => {
                                            setLoading(true);
                                            try {
                                                await writeYourContractAsync({
                                                    functionName: "buyTicket",
                                                    args: [event.args._ticketId],
                                                    value: parseEther(formatEther((event?.args?._price) || 0n)),
                                                });
                                                router.push('/success');
                                            } catch (e) {
                                                console.error("Error setting greeting:", e);
                                            } finally {
                                                setLoading(false);
                                            }
                                        }}>

                                            {loading ? <span className="loading loading-dots loading-xl"></span> : `${formatEther((event?.args?._price) || 0n)} ETH`}

                                        </button>
                                    </div>

                                </div>
                                <div className='h-1/2'>
                                    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                                        <Image src={"/fly2.jpg"} alt="Luggage2" width={400} height={200} />
                                        <div className="p-4">
                                            <h2 className="text-xl font-bold text-center dark:text-white">Economy</h2>
                                            <ul className="mt-4 space-y-4 text-gray-600">
                                                <li className="flex items-center">
                                                    <svg
                                                        className="w-6 h-6 text-gray-500 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M9 17v-5a3 3 0 016 0v5m-7-3h8m-5 3h2m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <span>2 piece of cabin baggage</span>
                                                    <span className="text-gray-400 ml-2">(55x40x20 cm, 8 kg)</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <svg
                                                        className="w-6 h-6 text-gray-500 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 4v16m-8-8h16"
                                                        />
                                                    </svg>
                                                    <span>2 Piece of Underseat Bag</span>
                                                    <span className="text-gray-400 ml-2">(40x30x15 cm, 3 kg)</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <svg
                                                        className="w-6 h-6 text-gray-500 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 11c0 2.21-3 4-3 4s-3-1.79-3-4a3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    <span>20 Kg Check-in Baggage</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <button className="bg-yellow-400 p-4 text-center text-white font-bold w-full" onClick={async () => {
                                            setLoading(true);
                                            try {
                                                await writeYourContractAsync({
                                                    functionName: "buyTicket",
                                                    args: [event?.args?._ticketId],
                                                    value: parseEther((parseFloat(formatEther((event?.args?._price) || 0n)) * 1.1).toFixed(3)),
                                                });
                                                router.push('/success');
                                                
                                            } catch (e) {
                                                console.error("Error setting greeting:", e);
                                            } finally {
                                                setLoading(false);
                                                
                                            }
                                        }}>

                                            {loading ? <span className="loading loading-dots loading-xl"></span> : `${(parseFloat(formatEther((event?.args?._price) || 0n)) * 1.1).toFixed(3)} ETH`}

                                        </button>
                                            
                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div >




        </>
    )
}

export default flights
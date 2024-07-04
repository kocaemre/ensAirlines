



'use client';
import React from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { Address } from '~~/components/scaffold-eth';
import { useScaffoldEventHistory } from '~~/hooks/scaffold-eth';
import { formatEther } from 'viem';

import Link from 'next/link';

const MyFlights = () => {
    const { address: connectedAddress } = useAccount();

    const getSeatLabel = (index: number) => {
        const row = Math.floor(index / 4) + 1;
        const seatLetter = ["A", "B", "C", "D"][index % 4];
        return `${row}${seatLetter}`;
      };


    const {
        data: events,
        isLoading: isLoadingEvents,
        error: errorReadingEvents,
    } = useScaffoldEventHistory({
        contractName: 'YourContract',
        eventName: 'buyTicketEvent',
        fromBlock: 0n,
        watch: true,
        filters: { _user: connectedAddress || undefined }, // Eğer connectedAddress boşsa undefined olarak ayarlıyoruz
        blockData: true,
        transactionData: true,
        receiptData: true,
    });

    const {
        data: checked
    } = useScaffoldEventHistory({
        contractName: 'YourContract',
        eventName: 'checkInEvent',
        fromBlock: 0n,
        watch: true,
        filters: { _user: connectedAddress || undefined }, // Eğer connectedAddress boşsa undefined olarak ayarlıyoruz
        blockData: true,
        transactionData: true,
        receiptData: true,
    });

    return (
        <>
            <div className='bg-blue-500 h-48 flex items-center justify-center text-center'>
                <Image src="/plane.png" alt="flight" width={300} height={400} />
            </div>





            <div className='mx-auto my-5'>
                <Address size="xl" address={connectedAddress} />
            </div>

            <div className='mx-auto'>

                <div role="tablist" className="tabs tabs-bordered mx-auto">
                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Checked Flights" defaultChecked/>
                    <div role="tabpanel" className="tab-content">


                        {checked?.map((event, index) => (

                            <div className="my-5" id={`collapse-${index}`}>
                                <div className=" text-center rounded-2xl bg-base-100">
                                    <div className="w-96">
                                        <h1 className="text-3xl font-bold">{event.args._flightCode}</h1>
                                        <p className="text-2xl font-semibold">
                                            Where : {event.args._from} <br />
                                            To : {event.args._to} <br />
                                            Time : {event.args._date} <br />
                                            Seat : {getSeatLabel((event.args._seatNumber)?.toString())} <br /> <br />
                                        </p>

                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="All Flights"
                         />
                    <div role="tabpanel" className="tab-content">

                        {events?.map((event, index) => (

                            <div className="my-5" id={`collapse-${index}`}>
                                <div className=" text-center rounded-2xl bg-base-100">
                                    <div className="w-96">
                                        <h1 className="text-3xl font-bold">{event.args._flightCode}</h1>
                                        <p className="text-2xl font-semibold">
                                            Where : {event.args._from} <br />
                                            To : {event.args._to} <br />
                                            Time : {event.args._date} <br />
                                            Baggage : {BigInt(event.args._luggageWeight)?.toString()} kg <br />
                                            Price : {formatEther(event.args._price)?.toString()} Ξ <br />
                                        </p>
                                        <Link className='btn btn-primary my-5'
                                            href={`/flights/${event.args._ticketId}`}
                                            
                                        > Check-in</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>





            </div>


        </>
    );
};

export default MyFlights;





"use client"


import React, { useState } from 'react'
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useScaffoldReadContract, useScaffoldWriteContract } from '~~/hooks/scaffold-eth';


const checkin = ({ params }) => {


  const { address: connectedAddress } = useAccount();

  const { data: flightInfo } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "tickets",
    args: [BigInt(params.flights)],
  });

  const { data: seatMap } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getSeatMap",
    args: [BigInt(params.flights)],
  });

  const { data: isCheckedIn } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "isCheckedIn",
    args: [BigInt(params.flights), connectedAddress],
  });


  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const getSeatLabel = (index: number) => {
    const row = Math.floor(index / 4) + 1;
    const seatLetter = ["A", "B", "C", "D"][index % 4];
    return `${row}${seatLetter}`;
  };


  const router = useRouter();




  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");

  return (
    <>
      {isCheckedIn ? (
        <div className='text-4xl font-bold Check-in mx-auto my-5'>You have already checked in</div>
      ) : (
        <>
          <div className='text-4xl font-bold Check-in mx-auto my-5'> Check-in
            <p>Flight: {flightInfo ? flightInfo[0].toString() : "Loading..."}</p>
          </div>
        

          {<div className='mx-auto'>
            <div className="flex flex-wrap justify-start">
              {seatMap?.map((seat, index) =>
              (
                <div key={index} className="w-1/4 p-1">
                  {seat.toString() === "true" ? (
                    <button className="btn btn-sm w-full mb-1 btn-ghost" disabled>
                      {getSeatLabel(index)}
                    </button>
                  ) : (
                    <button className="btn btn-sm active w-full mb-1 bg-gray-200 dark:bg-slate-700" onClick={() => setSelectedSeat(index)}>
                      {getSeatLabel(index)}
                    </button>
                  )}
                </div>
              ),
              )}
            </div>
          </div>
          }
          <div className='mx-auto text-2xl font-serif '>You have selected : {getSeatLabel(selectedSeat)}</div>

          <button
            className="btn btn-primary mx-auto my-5"
            onClick={async () => {
              
              try {
                await writeYourContractAsync({
                  functionName: "checkIn",
                  args: [BigInt(params.flights), selectedSeat],
                })
                router.push('/my-flights');
              } catch (e) {
                console.error("Error setting greeting:", e);
              }
            }}
          >
            Check-in
          </button>



        </>
      )}
    </>
  )
}

export default checkin
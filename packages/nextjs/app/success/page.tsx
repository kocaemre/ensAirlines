'use client'

import React from 'react'
import Image from 'next/image';

const success = () => {
    return (
        <>
            <div className='bg-blue-500 h-48 flex items-center justify-center text-center'>
                <Image src="/plane.png" alt="flight" width={300} height={400} />
            </div>

            <ul className="steps my-5">
                <li className="step step-primary dark:step-warning">Search ticket</li>
                <li className="step step-primary dark:step-warning">Select Ticket</li>
                <li className="step step-primary dark:step-warning">Purchase</li>
            </ul>

            <div className='mx-auto text-4xl font-sans my-5'>You have succesfully bought the ticket!</div>

            <div className='mx-auto text-4xl font-bold my-5'>For more information,please check My Flights section!</div>

        </>
    )
}

export default success
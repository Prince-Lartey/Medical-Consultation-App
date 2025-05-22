import Sales from '@/components/Dashboard/Doctor/Sales'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSales } from '../../../../../actions/sales'

export default async function page() {
    const Sales = await getSales()

    return (
        <div className='p-8 max-w-4xl mx-auto w-full'>
            {Sales.length > 0 ? (
                <Sales data={Sales} title="All Appointment Sales" />
            ) : (
                <div className="">
                    <p>No Sales Yet</p>
                </div>
            )}
        </div>
    )
}

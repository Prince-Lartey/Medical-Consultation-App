import React from 'react'
import { getSales } from '../../../../../actions/sales'
import Sales from '@/components/Dashboard/Doctor/Sales'

export default async function page() {
    const sales = await getSales()

    return (
        <div className='p-8 max-w-4xl mx-auto w-full'>
            {sales.length > 0 ? (
                <Sales data={sales} title="All Appointment Sales" role="ADMIN" />
            ) : (
                <div className="">
                    <p>No Sales Yet</p>
                </div>
            )}
        </div>
    )
}

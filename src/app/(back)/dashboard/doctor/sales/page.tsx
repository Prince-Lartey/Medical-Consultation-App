import Sales from '@/components/Dashboard/Doctor/Sales'
import React from 'react'
import { getDoctorSales } from '../../../../../../actions/sales'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function page() {
    const session = await getServerSession(authOptions)
    const id = session?.user.id
    const role = session?.user.role

    const doctorSales = await getDoctorSales(id)

    return (
        <div className='p-8 max-w-4xl mx-auto w-full'>
            {doctorSales.length > 0 ? (
                <Sales data={doctorSales} title="Appointment Sales" role="DOCTOR" />
            ) : (
                <div className="">
                    <p>No Sales Yet</p>
                </div>
            )}
        </div>
    )
}

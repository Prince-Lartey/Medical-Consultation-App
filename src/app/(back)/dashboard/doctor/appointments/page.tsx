import React from 'react'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import { getAppointments } from '../../../../../../actions/appointments'

export default async function page() {
    const appointments = await getAppointments()

    return (
        <div>
            <div className="col-span-8">
                <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                    <div className="flex item-center gap-4">
                        <NewButton title="New Appointment" href="#" />
                    </div>
                </div>
                <HomeDisplayCard count={appointments.length} />
            </div>
        </div>
    )
}

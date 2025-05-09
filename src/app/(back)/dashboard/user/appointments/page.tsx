import React from 'react'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import { getPatientAppointments } from '../../../../../../actions/appointments'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NotAuthorized from '@/components/NotAuthorized'

export default async function page() {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (user?.role !== "USER") {
        return (
            <NotAuthorized />
        )
    }

    const appointments = await getPatientAppointments(user?.id)

    return (
        <div>
            <div className="col-span-8">
                <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                    <div className="flex item-center gap-4">
                        <NewButton title="New Appointment" href="/dashboard/user/appointments/new" />
                    </div>
                </div>
                <HomeDisplayCard count={appointments.length} />
            </div>
        </div>
    )
}

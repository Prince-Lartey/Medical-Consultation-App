import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import React from 'react'
import { Calendar } from 'lucide-react'
import { getPatientAppointments } from '../../../../../../actions/appointments'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NotAuthorized from '@/components/NotAuthorized'

export default async function layout({children}: {children: React.ReactNode}) {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (user?.role !== "USER") {
        return (
            <NotAuthorized />
        )
    }

    const appointments = await getPatientAppointments(user?.id)

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-4 py-3 border-r border-gray-100">
                <PanelHeader title="Appointments" count={appointments.length} icon={Calendar} />
                <div className="px-3">
                    <ListPanel appointments={appointments} user={user}/>
                </div>
            </div>
            <div className="col-span-8">{children}</div>
        </div>
    )
}

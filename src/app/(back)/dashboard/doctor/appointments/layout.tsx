import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import React from 'react'
import { Calendar } from 'lucide-react'
import { getAppointments } from '../../../../../../actions/appointments'

export default async function layout({children}: {children: React.ReactNode}) {
    const appointments = await getAppointments()

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-4 py-3 border-r border-gray-100">
                <PanelHeader title="Appointments" count={appointments.length} icon={Calendar} />
                <div className="px-3">
                    <ListPanel appointments={appointments}/>
                </div>
            </div>
            <div className="col-span-8">{children}</div>
        </div>
    )
}

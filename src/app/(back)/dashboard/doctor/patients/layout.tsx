import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import React from 'react'
import { Users } from 'lucide-react'
import { getDoctorAppointments } from '../../../../../../actions/appointments'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NotAuthorized from '@/components/NotAuthorized'
import { Appointment } from '@prisma/client'
import PatientPanel from '@/components/Dashboard/Doctor/PatientPanel'

export interface PatientProps {
    patientId: string
    name: string
    email: string
    phone: string
    location: string
    gender: string
    occupation: string
    dob: string
}

export default async function layout({children}: {children: React.ReactNode}) {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (user?.role !== "DOCTOR") {
        return (
            <NotAuthorized />
        )
    }
    const appointments = await getDoctorAppointments(user?.id)

    const uniquePatientsMap = new Map()

    appointments.forEach((appointment: Appointment) => {
        if(!uniquePatientsMap.has(appointment.patientId)) {
            uniquePatientsMap.set(appointment.patientId, {
                patientId: appointment.patientId,
                name: `${appointment.firstName} ${appointment.lastName}`,
                email: appointment.email,
                phone: appointment.phone,
                location: appointment.location,
                gender: appointment.gender,
                occupation: appointment.occupation,
                dob: appointment.dob,
            })
        }
    })
    const patients = Array.from(uniquePatientsMap.values()) as PatientProps[]

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-4 py-3 border-r border-gray-100">
                <PanelHeader title="Patients" count={patients.length} icon={Users} />
                <div className="px-3">
                    <PatientPanel patients={patients}/>
                </div>
            </div>
            <div className="col-span-8">{children}</div>
        </div>
    )
}

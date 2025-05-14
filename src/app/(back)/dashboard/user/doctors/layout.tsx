import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import React from 'react'
import { UserPen } from 'lucide-react'
import { getPatientAppointments } from '../../../../../../actions/appointments'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NotAuthorized from '@/components/NotAuthorized'
import { Appointment } from '@prisma/client'
import DoctorPanel from '@/components/Dashboard/Doctor/DoctorPanel'

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

export interface DoctorProps {
    doctorId: string
    doctorName: string
}

export default async function layout({children}: {children: React.ReactNode}) {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (user?.role !== "USER") {
        return (
            <NotAuthorized />
        )
    }
    const appointments = await getPatientAppointments(user?.id)
        
    const uniqueDoctorsMap = new Map()
    
    appointments.forEach((appointment: Appointment) => {
        if(!uniqueDoctorsMap.has(appointment.doctorId)) {
            uniqueDoctorsMap.set(appointment.doctorId, {
                doctorId: appointment.doctorId,
                doctorName: appointment.doctorName ?? "Name not Provided"
            })
        }
    })
    const doctors = Array.from(uniqueDoctorsMap.values()) as DoctorProps[]

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-4 py-3 border-r border-gray-100">
                <PanelHeader title="Doctors" count={doctors.length} icon={UserPen} />
                <div className="px-3">
                    <DoctorPanel doctors={doctors}/>
                </div>
            </div>
            <div className="col-span-8">{children}</div>
        </div>
    )
}

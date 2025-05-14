import InboxForm from '@/components/Dashboard/InboxForm'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import { getPatientAppointments } from '../../../../../../../actions/appointments'
import { Appointment } from '@prisma/client'
import { DoctorProps } from '../../../doctor/patients/layout'

export default async function page() {
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

    const users = doctors.map((doctor) => {
        return {
            label: doctor.doctorName,
            value: doctor.doctorId
        }
    })

    return (
        <div>
            <InboxForm title="New Message" users={users} session={session} />
        </div>
    )
}

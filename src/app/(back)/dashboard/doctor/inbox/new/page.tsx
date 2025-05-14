import InboxForm from '@/components/Dashboard/InboxForm'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import { getDoctorAppointments } from '../../../../../../../actions/appointments'
import { Appointment } from '@prisma/client'
import { PatientProps } from '../../patients/layout'

export default async function page() {
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

    const users = patients.map((patient) => {
        return {
            label: patient.name,
            value: patient.patientId
        }
    })

    return (
        <div>
            <InboxForm title="New Message" users={users} session={session} />
        </div>
    )
}

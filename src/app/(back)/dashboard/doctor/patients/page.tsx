import React from 'react'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import { getDoctorAppointments } from '../../../../../../actions/appointments'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NotAuthorized from '@/components/NotAuthorized'
import { Appointment } from '@prisma/client'
import { PatientProps } from './layout'
import { Users } from 'lucide-react'
import generateSlug from '@/utils/generateSlug'

export default async function page() {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (user?.role !== "DOCTOR") {
        return (
            <NotAuthorized />
        )
    }
    const slug = generateSlug(user?.name ?? "")
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
        <div>
            <div className="col-span-8">
                <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                    <div className="flex item-center gap-4">
                        <NewButton title="New Patient" href={`/doctors/${slug}`} />
                    </div>
                </div>
                <div className="flex h-1/2 items-center justify-center">
                    <div className="py-4 px-6 text-center border border-gray-100 shadow-md rounded-md flex flex-col items-center gap-1 text-sm">
                        <Users />
                        <div className="py-3">
                            {" "}
                            <p>You&apos;ve attended to {patients.length} patients</p>
                        </div>
                        <NewButton title="New Patient" href={`/doctors/${slug}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

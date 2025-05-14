import React from 'react'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import { getPatientAppointments } from '../../../../../../actions/appointments'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NotAuthorized from '@/components/NotAuthorized'
import { Appointment } from '@prisma/client'
import { UserPen } from 'lucide-react'
import { DoctorProps } from '../../doctor/patients/layout'

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

    // const users = doctors.map((doctor) => {
    //     return {
    //         label: doctor.doctorName,
    //         value: doctor.doctorId
    //     }
    // })

    return (
        <div>
            <div className="col-span-8">
                <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                    <div className="flex item-center gap-4">
                        <NewButton title="New Doctor" href="/" />
                    </div>
                </div>
                <div className="flex h-1/2 items-center justify-center">
                    <div className="py-4 px-6 text-center border border-gray-100 shadow-md rounded-md flex flex-col items-center gap-1 text-sm">
                        <UserPen />
                        <div className="py-3">
                            {" "}
                            <p>You&apos;ve had appointments with {doctors.length} doctors</p>
                        </div>
                        <NewButton title="New Doctor" href="/" />
                    </div>
                </div>
            </div>
        </div>
    )
}

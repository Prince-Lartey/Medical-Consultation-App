import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import React from 'react'
import { UserPen } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NotAuthorized from '@/components/NotAuthorized'
import { getDoctors } from '../../../../../actions/users'
import AdminDoctorPanel from '@/components/Dashboard/Doctor/AdminDoctorPanel'

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
    if (user?.role !== "ADMIN") {
        return (
            <NotAuthorized />
        )
    }
    const doctors = await getDoctors()

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-4 py-3 border-r border-gray-100">
                <PanelHeader title="Doctors" count={doctors.length} icon={UserPen} />
                <div className="px-3">
                    <AdminDoctorPanel doctors={doctors}/>
                </div>
            </div>
            <div className="col-span-8">{children}</div>
        </div>
    )
}

import React from 'react'
import { getAppointmentById } from '../../../../../../../../actions/appointments'
import { Clock } from 'lucide-react'
import { formatDateOfBirth } from '@/utils/formatDateOfBirth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import UpdateAppointmentForm from '@/components/Dashboard/Doctor/UpdateAppointmentForm'

interface PageProps {
    params: {
        id: string;
    };
}

export default async function page({params}: PageProps) {
    const appointment = await getAppointmentById(params.id)

    return (
        <div>
            <div className="flex items-center justify-between px-4 py-4 border-b">
                <div className="">
                    <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">{appointment.firstName} {appointment.lastName}</h2>
                    <div className="flex space-x-2 divide-x-2 divide-gray-200 text-sm">
                        <p className="capitalize px-2">{appointment.gender}</p>
                        <p className="px-2">{appointment.phone}</p>
                    </div>
                </div>
                <div>
                    <h2 className="scroll-m-20 pb-2 text-xl tracking-tight first:mt-0">{appointment?.appointmentFormattedDate}</h2>
                    <div className="flex items-center text-sm ">
                        <Clock className="w-4 h-4 mr-2"/>
                        <span>{appointment?.appointmentTime}</span>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
                    <p className="px-3 text-sm font-semibold">Reason</p>
                    <p className="px-3 text-sm">{appointment.appointmentReason}</p>
                </div>
            </div>
            <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
                <p className="px-3 text-sm font-semibold">Date of Birth</p>
                <p className="px-3 text-sm">{formatDateOfBirth(appointment.dob)}</p>
            </div>
            <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
                <p className="px-3 text-sm font-semibold">Email</p>
                <p className="px-3 text-sm">{appointment.email}</p>
            </div>
            <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
                <p className="px-3 text-sm font-semibold">Location</p>
                <p className="px-3 text-sm">{appointment.location}</p>
            </div>
            <div className="flex divide-x-2 px-4 py-3 divide-gray-200 border-b items-center">
                <p className="px-3 text-sm font-semibold">Medical Documents</p>
                <div className="grid grid-cols-4 px-3 gap-4">
                    {
                        appointment.medicalDocuments.map((doc, index) => {
                            return (
                                <Button key={index} variant="outline" asChild>
                                    <Link target="_blank" href={doc} download>{`Doc-${index + 1}`}</Link>
                                </Button>
                            )
                        })
                    }
                </div>
            </div>
            <div className="">
                <UpdateAppointmentForm appointment={appointment}/>
            </div>
        </div>
    )
}

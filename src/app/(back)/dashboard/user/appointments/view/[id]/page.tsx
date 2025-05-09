import React from 'react'
import { getAppointmentById } from '../../../../../../../../actions/appointments'
import { BadgeCheck, CircleEllipsis, CircleX, Clock, Mail, PhoneCall, Video } from 'lucide-react'
import { formatDateOfBirth } from '@/utils/formatDateOfBirth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function page({params}: {params: Promise<{ id: string }>;}) {
    const { id } = await params

    const appointment = await getAppointmentById(id)

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
                        appointment.medicalDocuments.map((doc: any, index: any) => {
                            return (
                                <Button key={index} variant="outline" asChild>
                                    <Link target="_blank" href={doc} download>{`Doc-${index + 1}`}</Link>
                                </Button>
                            )
                        })
                    }
                </div>
            </div>
            {appointment.status === "approved" ? (
                <div className="">
                    <div className="border-2 border-gray-700 shadow rounded-md p-4 my-4 mx-4">
                        <div className="sm:col-span-4">
                            <div className="border-b pb-2 flex justify-between items-center">
                                <div className="flex items-center px-4 py-2 rounded-md bg-green-700 text-white scroll-m-20 text-xl font-semibold tracking-tight">
                                    <BadgeCheck className="w-8 h-8 mr-2" />
                                    <span className="capitalize">Appointment Approved</span>
                                </div>
                                <Button>
                                    {`${appointment.appointmentFormattedDate} at ${appointment.appointmentTime}`}
                                </Button>
                            </div>
                            <div className="py-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-semibold capitalize">{appointment.meetingProvider}</h2>
                                    <Button asChild variant={'outline'}>
                                        <Link href={appointment.meetingLink}>
                                            <Video className="w-4 h-4 mr-2" />
                                            <span>Join Meeting</span>
                                        </Link>
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h2 className="font-semibold capitalize">Contact the Doctor via</h2>
                                    <div className="flex gap-4">
                                        <Button asChild variant={'outline'}>
                                            <Link href={appointment.meetingLink}>
                                                <PhoneCall className="w-4 h-4 mr-2" />
                                                <span>Call Doctor</span>
                                            </Link>
                                        </Button>
                                        <Button asChild variant={'outline'}>
                                            <Link href={appointment.meetingLink}>
                                                <Mail className="w-4 h-4 mr-2" />
                                                <span>Mail Doctor</span>
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border-2 border-gray-700 shadow rounded-md p-4 my-4 mx-4">
                    <div className="sm:col-span-4">
                        <div className="flex justify-between items-center">
                            <label htmlFor="username" className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">Appointment Status</label>
                            {
                                appointment.status === "rejected" ? (
                                    <div className="flex items-center px-4 py-2 rounded-md bg-red-700 text-red-200 dark:bg-red-700 dark:text-red-200">
                                        <CircleEllipsis className="w-4 h-4 mr-2" />
                                        <span className="capitalize">{appointment.status}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center px-4 py-2 rounded-md bg-yellow-300 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-200">
                                        <CircleX className="w-4 h-4 mr-2" />
                                        <span className="capitalize">{appointment.status}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

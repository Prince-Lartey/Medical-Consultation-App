import React from 'react'
import { BadgeCheck, CalendarCheck, CircleEllipsis, CircleX, History } from 'lucide-react'
import Link from 'next/link'
import { timeAgo } from '@/utils/timeAgo'
import { cn } from '@/lib/utils'
import { Appointment } from '@prisma/client'
import { getDoctorById } from '../../../../../../../actions/users'
import { getDoctorAppointments } from '../../../../../../../actions/appointments'
import { Doctor } from '../../../../../../../types/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDateOfBirth } from '@/utils/formatDateOfBirth'

export default async function page({params}: {params: Promise<{ id: string }>;}) {
    const { id } = await params
    const appointments = await getDoctorAppointments(id)
    const doctor: Doctor = await getDoctorById(id)

    return (
        <div className="p-4">
            <div className="flex items-center justify-between">
                <div className="">
                    <h2 className="border-b pb-3 mb-3 scroll-m-20 text-xl font-semibold tracking-tight">
                        {doctor.name}
                    </h2>
                    <h2 className="border-b pb-3 mb-3">
                        {doctor.email} | {doctor.phone}
                    </h2>
                </div>
                <div className="">
                    <div className={cn("flex items-center border-b pb-3 mb-3 scroll-m-20 text-xl ", doctor.doctorProfile?.status === "approved" ? "text-green-500" : doctor.doctorProfile?.status === "rejected" ? "text-red-500" : "text-yellow-500")}>
                        {
                            doctor.doctorProfile?.status === "pending" ? (
                                <CircleEllipsis className="w-4 h-4 mr-2"/>
                            ) : doctor.doctorProfile?.status === "approved" ? (
                                <BadgeCheck className="w-4 h-4 mr-2"/>
                            ) : (
                                <CircleX className="w-4 h-4 mr-2"/>
                            )
                        }
                        <span className="font-semibold capitalize">{doctor.doctorProfile?.status}</span>
                    </div>
                    <h2 className="border-b pb-3 mb-3 font-semibold">
                        Appointments ({appointments.length.toString().padStart(2, "0")})
                    </h2>
                </div>
            </div>
            <Tabs defaultValue="details" className="w-full">
                <TabsList>
                    <TabsTrigger value="details">Doctor Details</TabsTrigger>
                    <TabsTrigger value="appointments">Doctor Appointments</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <div className="p-4">
                        <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2">Bio Data</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <span className="mr-3">First Name :</span>
                                <span>{doctor.doctorProfile?.firstName}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Last Name :</span>
                                <span>{doctor.doctorProfile?.lastName}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Date of Birth :</span>
                                <span>{formatDateOfBirth(doctor.doctorProfile?.dob)}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Gender :</span>
                                <span className="capitalize">{doctor.doctorProfile?.gender}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2">Profile Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <span className="mr-3">Medical License :</span>
                                <span>{doctor.doctorProfile?.medicalLicense}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Years of Experience :</span>
                                <span>{doctor.doctorProfile?.yearsOfExperience}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Medical License Expiry :</span>
                                <span>{formatDateOfBirth(doctor.doctorProfile?.medicalLicenseExpiry)}</span>
                            </div>
                            
                        </div>
                        <div className="flex items-center py-2">
                            <span className="capitalize">{doctor.doctorProfile?.bio}</span>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="appointments">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                        {appointments.map((appointment: Appointment) => {
                            return (
                                <Link key={appointment.id}  href={`/dashboard/doctor/appointments/view/${appointment.id}`} className={cn("border mb-2 border-gray-300 shadow-sm text-xs py-3 px-2 inline-block w-full bg-white dark:text-slate-900 rounded-md")}>
                                    <div className="flex justify-between items-center pb-2">
                                        <h2>{appointment.firstName} {appointment.lastName}</h2>
                                        <div className="flex items-center">
                                            <History className="w-4 h-4 mr-2"/>
                                            <span>{timeAgo(appointment.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 border-b pb-2">
                                        <div className="flex items-center font-semibold">
                                            <CalendarCheck className="w-4 h-4 mr-2"/>
                                            <span>{appointment.appointmentFormattedDate}</span>
                                        </div>
                                        <span className="font-semibold">{appointment.appointmentTime}</span>
                                    </div>
                                    <div className={cn("flex items-center pt-2", appointment.status === "approved" ? "text-green-500" : appointment.status === "rejected" ? "text-red-500" : "text-yellow-500")}>
                                        {
                                            appointment.status === "pending" ? (
                                                <CircleEllipsis className="w-4 h-4 mr-2"/>
                                            ) : appointment.status === "approved" ? (
                                                <BadgeCheck className="w-4 h-4 mr-2"/>
                                            ) : (
                                                <CircleX className="w-4 h-4 mr-2"/>
                                            )
                                        }
                                        <span className="font-semibold capitalize">{appointment.status}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </TabsContent>
            </Tabs>
            
        </div>
    )
}

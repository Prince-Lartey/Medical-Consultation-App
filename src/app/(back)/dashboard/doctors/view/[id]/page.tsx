import React from 'react'
import { BadgeCheck, CalendarCheck, CircleEllipsis, CircleX, FileIcon, History } from 'lucide-react'
import Link from 'next/link'
import { timeAgo } from '@/utils/timeAgo'
import { cn } from '@/lib/utils'
import { Appointment } from '@prisma/client'
import { getDoctorById } from '../../../../../../../actions/users'
import { getDoctorAppointments } from '../../../../../../../actions/appointments'
import { Doctor } from '../../../../../../../types/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDateOfBirth } from '@/utils/formatDateOfBirth'
import ApproveBtn from '@/components/ApproveBtn'

export default async function page({params}: {params: Promise<{ id: string }>;}) {
    const { id } = await params
    const appointments = await getDoctorAppointments(id)
    const doctor: Doctor = await getDoctorById(id)

    const otherSpecialties = doctor.doctorProfile?.otherSpecialties ?? []
    const academcDocuments = doctor.doctorProfile?.boardCertificates ?? []
    const hospitalServices = doctor.doctorProfile?.servicesOffered ?? []
    const additionalDocuments = doctor.doctorProfile?.additionalDocs ?? []

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
                    <div className="border-b pb-3 mb-3">
                        <ApproveBtn status={doctor.doctorProfile?.status} profileId={doctor.doctorProfile?.id} />
                    </div>
                    <h2 className="border-b pb-3 mb-3 scroll-m-20 text-lg tracking-tight">
                        Appointments ({appointments.length.toString().padStart(2, "0")})
                    </h2>
                </div>
            </div>
            <Tabs defaultValue="details" className="w-full">
                <TabsList>
                    <TabsTrigger value="details">Doctor Details</TabsTrigger>
                    <TabsTrigger value="education">Education Info</TabsTrigger>
                    <TabsTrigger value="practice">Practice Info</TabsTrigger>
                    <TabsTrigger value="additional">Additional Info</TabsTrigger>
                    <TabsTrigger value="appointments">Doctor Appointments</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <div className="p-4">
                        <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2 font-semibold">Bio Data</h2>
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
                            <div className="flex items-center">
                                <span className="mr-3">Region :</span>
                                <span className="capitalize">{doctor.doctorProfile?.region}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">City :</span>
                                <span className="capitalize">{doctor.doctorProfile?.city}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2 font-semibold">Profile Information</h2>
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
                        <div className="flex items-center py-4">
                            <span className="">{doctor.doctorProfile?.bio}</span>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="education">
                    <div className="p-4">
                        <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2 font-semibold">Education Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <span className="mr-3">Graduation Year :</span>
                                <span>{doctor.doctorProfile?.graduationYear}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Primary Specialization :</span>
                                <span>{doctor.doctorProfile?.primarySpecialization}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Medical School :</span>
                                <span>{doctor.doctorProfile?.medicalSchool}</span>
                            </div>
                        </div>
                        <div className="py-4">
                            <span className="mr-3">Other Specialties :</span>
                            <div className="flex flex-wrap gap-4 mt-3">
                                {
                                    otherSpecialties.map((item, index) => {
                                        return (
                                            <div key={index} className="border-slate-300 border-2 flex space-x-2 items-center dark:border-slate-200 px-4 py-2 rounded-lg">
                                                <span className="text-sm">{item}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="py-4">
                            <span className="mr-3">Academic Documents :</span>
                            <div className="flex flex-wrap gap-4 mt-3">
                                {
                                    academcDocuments.map((item, index) => {
                                        return (
                                            <div key={index} className="py-2 rounded-md flex items-center px-4 bg-white dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-slate-200">
                                                <FileIcon className="w-8 h-8 mr-2 flex-shrink-0" />
                                                <div className="flex flex-col">
                                                    <span className="line-clamp-1">{item}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="practice">
                    <div className="p-4">
                        <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2 font-semibold">Practice Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <span className="mr-3">Hospital Name :</span>
                                <span>{doctor.doctorProfile?.hospitalName}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Hourly Charge :</span>
                                <span>{doctor.doctorProfile?.hourlyWage}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Hospital Address :</span>
                                <span>{doctor.doctorProfile?.hospitalAddress}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Hospital Contact :</span>
                                <span className="capitalize">{doctor.doctorProfile?.hospitalContactNumber}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Hospital Hours of Operation :</span>
                                <span className="capitalize">{doctor.doctorProfile?.hospitalHoursOfOperation}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-3">Do you Accept Insurance :</span>
                                <span className="capitalize">{doctor.doctorProfile?.insuranceAccepted}</span>
                            </div>
                        </div>
                        <div className="flex items-center pt-4">
                            <span className="mr-3">Hospital Email :</span>
                            <span className="capitalize">{doctor.doctorProfile?.hospitalEmailAddress}</span>
                        </div>
                        <div className="flex items-center pt-4">
                            <span className="mr-3">Hospital Website :</span>
                            <span className="">{doctor.doctorProfile?.hospitalWebsite}</span>
                        </div>
                        <div className="pt-4">
                            <span className="mr-3">Hospital Services :</span>
                            <div className="flex flex-wrap gap-4 mt-3">
                                {
                                    hospitalServices.map((item, index) => {
                                        return (
                                            <div key={index} className="border-slate-300 border-2 flex space-x-2 items-center dark:border-slate-200 px-4 py-2 rounded-lg">
                                                <span className="text-sm">{item}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="additional">
                    <div className="p-4">
                        <h2 className="text-sm uppercase tracking-widest border-b pb-1 mb-2 font-semibold">Additional Information</h2>
                        <div className="flex">
                            <span className="mr-3">Education History :</span>
                            <span>{doctor.doctorProfile?.educationHistory}</span>
                        </div>
                        <div className="flex mt-6">
                            <span className="mr-3">Published Works or Research :</span>
                            <span>{doctor.doctorProfile?.research}</span>
                        </div>
                        <div className="flex mt-6">
                            <span className="mr-3">Accomplishments and Awards :</span>
                            <span className="">{doctor.doctorProfile?.accomplishments}</span>
                        </div>
                        <div className="mt-6">
                            <span className="mr-3">Academic Documents :</span>
                            <div className="flex flex-wrap gap-4 mt-3">
                                {
                                    additionalDocuments.map((item: any, index: number) => {
                                        return (
                                            <div key={index} className="py-2 rounded-md flex items-center px-4 bg-white dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-slate-200">
                                                <FileIcon className="w-8 h-8 mr-2 flex-shrink-0" />
                                                <div className="flex flex-col">
                                                    <span className="line-clamp-1">{item}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
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

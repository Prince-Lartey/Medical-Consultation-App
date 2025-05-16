import React from 'react'
import AnalyticsCard from '../AnalyticsCard'
import {Session} from "next-auth"
import { DoctorAnalyticsProps, getUserAnalytics } from '../../../actions/stats'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { getPatientAppointments } from '../../../actions/appointments'
import { BadgeCheck, CalendarCheck, CircleEllipsis, CircleX, History } from 'lucide-react'
import { timeAgo } from '@/utils/timeAgo'
import { cn } from '@/lib/utils'
import { Appointment } from '@prisma/client'
import { DoctorProps } from '@/app/(back)/dashboard/patients/layout'
import generateSlug from '@/utils/generateSlug'

export default async function PatientDashboard({session}: {session: Session | null}) {
    const user = session?.user
    const analytics = (await getUserAnalytics()) || []
    const appointments = await getPatientAppointments(user!.id)

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
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">Welcome, {user?.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    analytics.map((analytic: DoctorAnalyticsProps, i) => {
                        return (
                            <AnalyticsCard key={i} data={analytic} />
                        )
                    })
                }
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 grid-cols-1">
                <Card x-chunk="dashboard-01-chunk-5">
                    <div className="flex justify-between items-center ">
                        <CardHeader >
                            <CardTitle>Recent Appointments</CardTitle>
                        </CardHeader>
                        <Button asChild className="mr-6">
                            <Link href={`/dashboard/user/appointments`} className="text-xs">View All</Link>
                        </Button>
                    </div>
                    <CardContent className="grid gap-4">
                        {appointments.length > 0 && ( 
                            appointments.map((appointment: Appointment) => (
                                <Link key={appointment.id}  href={`/dashboard/user/appointments/view/${appointment.id}`} className={cn("border mb-2 border-gray-300 shadow-sm text-xs py-3 px-2 inline-block w-full bg-white dark:text-slate-900 rounded-md")}>
                                    <div className="flex justify-between items-center pb-2">
                                        <h2>{appointment.firstName} {appointment.lastName}</h2>
                                        <div className="flex items-center">
                                            <History className="w-4 h-4 mr-2"/>
                                            <span>{timeAgo(appointment.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 pb-2">
                                        <div className="flex items-center font-semibold">
                                            <CalendarCheck className="w-4 h-4 mr-2"/>
                                            <span>{appointment.appointmentFormattedDate}</span>
                                        </div>
                                        <span className="font-semibold">{appointment.appointmentTime}</span>
                                        <div className={cn("flex items-center", appointment.status === "approved" ? "text-green-500" : appointment.status === "rejected" ? "text-red-500" : "text-yellow-500")}>
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
                                    </div>
                                    
                                </Link>
                            ))
                        )} 
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-5">
                    <div className="flex justify-between items-center ">
                        <CardHeader >
                            <CardTitle>Recent Doctors</CardTitle>
                        </CardHeader>
                        <Button asChild className="mr-6">
                            <Link href={`/dashboard/patient/doctors`} className="text-xs">View All</Link>
                        </Button>
                    </div>
                    <CardContent className="grid gap-8">
                        {doctors?.slice(0, 5).map((doctor) => {
                            const slug = generateSlug(doctor.doctorName)
                            return (
                                <div key={doctor.doctorId} className="flex items-center gap-4 justify-between border border-gray-300 shadow-sm rounded-md px-3 py-2">
                                    <div className="flex gap-2 items-center">
                                        <p className="text-sm font-semibold">
                                            {doctor.doctorName}
                                        </p> 
                                    </div>
                                    
                                    <Button asChild className="" variant={"outline"}>
                                        <Link href={`/doctors/${slug}?id=${doctor.doctorId}`} className="text-xs">View</Link>
                                    </Button>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

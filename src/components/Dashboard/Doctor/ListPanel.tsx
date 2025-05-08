"use client"

import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { BadgeCheck, CalendarCheck, CircleEllipsis, CircleX, History } from 'lucide-react'
import { Appointment, User } from '@prisma/client'
import { timeAgo } from '@/utils/timeAgo'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function ListPanel({ appointments, user }: { appointments: Appointment[], user: User}) {
    const pathname = usePathname()

    return (
        <ScrollArea className="h-[32rem] w-full">
            <div className="p-4">
                {appointments.length > 0 ? ( 
                    appointments.map((appointment) => (
                        <Link key={appointment.id}  href={user.role === "USER" ? `/dashboard/user/appointments/view/${appointment.id}` : `/dashboard/doctor/appointments/view/${appointment.id}`} className={cn("border mb-2 border-gray-300 shadow-sm text-xs py-3 px-2 inline-block w-full bg-white dark:text-slate-900 rounded-md", pathname === `/dashboard/doctor/appointments/view/${appointment.id}` && "border-gray-700 border-2 dark:border-blue-500 bg-gray-100")}>
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
                    ))
                ) : ( 
                    <div className="text-center py-4 text-gray-500">
                        No appointments found.
                    </div> 
                )} 
            </div>
        </ScrollArea>
    )
}

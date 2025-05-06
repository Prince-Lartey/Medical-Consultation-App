import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { CalendarCheck, History } from 'lucide-react'
import { Appointment } from '@prisma/client'
import { timeAgo } from '@/utils/timeAgo'

export default function ListPanel({ appointments }: { appointments: Appointment[] | null | any}) {
    let appointmentsArray = [];
    
    if (Array.isArray(appointments)) {
        appointmentsArray = appointments;
    } else if (appointments && appointments.data && Array.isArray(appointments.data)) {
        appointmentsArray = appointments.data;
    }

    return (
        <ScrollArea className="h-[32rem] w-full">
            <div className="p-4">
                {appointmentsArray.length > 0 ? ( 
                    appointmentsArray.map((appointment: Appointment[] | null | any) => (
                        <Link key={appointment.id}  href="/dashboard/doctor/appointments/view/1" className="border mb-2 border-gray-300 shadow-sm text-xs py-3 px-2 inline-block w-full bg-white dark:text-slate-900 rounded-md">
                            <div className="flex justify-between items-center pb-2">
                                <h2>{appointment.firstName} {appointment.lastName}</h2>
                                <span className="font-semibold">{appointment.appointmentTime}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center font-semibold">
                                    <CalendarCheck className="w-4 h-4 mr-2"/>
                                    <span>{appointment.appointmentFormattedDate}</span>
                                </div>
                                <div className="flex items-center">
                                    <History className="w-4 h-4 mr-2"/>
                                    <span>{timeAgo(appointment.createdAt)}</span>
                                </div>
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

"use client"

import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { Mail, MapPin, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { PatientProps } from '@/app/(back)/dashboard/doctor/patients/layout'

export default function PatientPanel({ patients }: { patients: PatientProps[] }) {
    const pathname = usePathname()

    return (
        <ScrollArea className="h-[32rem] w-full">
            <div className="p-4">
                {patients.length > 0 ? ( 
                    patients.map((patient) => (
                        <Link key={patient.patientId}  href={`/dashboard/doctor/patients/view/${patient.patientId}`} className={cn("border mb-2 border-gray-300 shadow-sm text-xs py-3 px-2 inline-block w-full bg-white dark:text-slate-900 rounded-md", pathname === `/dashboard/doctor/patients/view/${patient.patientId}` && "border-gray-700 border-2 dark:border-blue-500 bg-gray-100")}>
                            <div className="flex justify-between items-center pb-2">
                                <h2>{patient.name}</h2>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2"/>
                                    <span>{patient.location}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 border-b pb-2">
                                <div className="flex items-center font-semibold">
                                    <Mail className="w-4 h-4 mr-2"/>
                                    <span>{patient.email}</span>
                                </div>
                                <span className="font-semibold">{patient.phone}</span>
                            </div>
                            <div className={cn("flex items-center pt-2 text-blue-500")}>
                                <UserCircle className="w-4 h-4 mr-2"/>
                                <span className="font-semibold capitalize">{patient.gender}</span>
                            </div>
                        </Link>
                    ))
                ) : ( 
                    <div className="text-center py-4 text-gray-500">
                        No patients found.
                    </div> 
                )} 
            </div>
        </ScrollArea>
    )
}

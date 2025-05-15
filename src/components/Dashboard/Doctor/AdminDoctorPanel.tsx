"use client"

import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { Mail, MapPin, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Doctor } from '../../../../types/types'

export default function AdminDoctorPanel({ doctors }: { doctors: Doctor[] }) {
    const pathname = usePathname()

    return (
        <ScrollArea className="h-[32rem] w-full">
            <div className="p-4">
                {doctors.length > 0 ? ( 
                    doctors.map((doctor) => (
                        <Link key={doctor.id}  href={`/dashboard/doctor/view/${doctor.id}`} className={cn("border mb-2 border-gray-300 shadow-sm text-xs py-3 px-2 inline-block w-full bg-white dark:text-slate-900 rounded-md", pathname === `/dashboard/doctor/view/${doctor.id}` && "border-gray-700 border-2 dark:border-blue-500 bg-gray-100")}>
                            <div className="flex justify-between items-center pb-2">
                                <h2>{doctor.name}</h2>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2"/>
                                    <span>{doctor.doctorProfile?.city}, {doctor.doctorProfile?.region}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 border-b pb-2">
                                <div className="flex items-center font-semibold">
                                    <Mail className="w-4 h-4 mr-2"/>
                                    <span>{doctor.email}</span>
                                </div>
                                <span className="font-semibold">{doctor.phone}</span>
                            </div>
                            <div className={cn("flex items-center pt-2 text-blue-500")}>
                                <UserCircle className="w-4 h-4 mr-2"/>
                                <span className="font-semibold capitalize">{doctor.doctorProfile?.gender}</span>
                            </div>
                        </Link>
                    ))
                ) : ( 
                    <div className="text-center py-4 text-gray-500">
                        No Doctor found.
                    </div> 
                )} 
            </div>
        </ScrollArea>
    )
}

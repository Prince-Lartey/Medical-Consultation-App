"use client"

import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { DoctorProps } from '@/app/(back)/dashboard/doctor/patients/layout'
import generateSlug from '@/utils/generateSlug'

export default function DoctorPanel({ doctors }: { doctors: DoctorProps[] }) {
    const pathname = usePathname()

    return (
        <ScrollArea className="h-[32rem] w-full">
            <div className="p-4">
                {doctors.length > 0 ? ( 
                    doctors.map((doctor, i) => {
                        const slug = generateSlug(doctor.doctorName)
                        return (
                            <Link key={i}  href={`/doctors/${slug}?id=${doctor.doctorId}`} className={cn("border mb-2 border-gray-300 shadow-sm text-xs py-3 px-2 inline-block w-full bg-white dark:text-slate-900 rounded-md", pathname === `/dashboard/doctor/patients/view/${doctor.doctorId}` && "border-gray-700 border-2 dark:border-blue-500 bg-gray-100")}>
                                <div className="flex justify-between items-center pb-2">
                                    <h2>{doctor.doctorName}</h2>
                                </div>
                            </Link>
                        )
                    })
                ) : ( 
                    <div className="text-center py-4 text-gray-500">
                        No patients found.
                    </div> 
                )} 
            </div>
        </ScrollArea>
    )
}

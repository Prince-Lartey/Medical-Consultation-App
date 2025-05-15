import { cn } from '@/lib/utils'
import { DoctorStatus } from '@prisma/client'
import React from 'react'

export default function ApproveBtn({status}: {status: DoctorStatus}) {
    return (
        <button className={cn("py-1.5 px-3 rounded-md text-xs", status === "approved" ? "bg-green-500" : status === "pending" ? "bg-yellow-500" : "bg-red-500")}>
            {status}
        </button>
    )
}

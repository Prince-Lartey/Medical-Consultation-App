"use client"

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatDateOfBirth } from "@/utils/formatDateOfBirth"
import { generateInitials } from "@/utils/generateInitials"
import { Sale, UserRole } from "@prisma/client"
import Link from "next/link"

export default function Sales({data, title, role}: {data: Sale[], title: string, role: UserRole | undefined}) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
            {data.map((item, i) => {
                const initial = generateInitials(item.patientName)
                return (
                    <>
                        {role === "DOCTOR" ? (
                            <Link href={`/dashboard/doctor/appointments/view/${item.appointmentId}`} key={i} className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarFallback>{initial}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">{item.patientName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.appointmentId}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">GHS {item.totalAmount.toLocaleString()}</div>
                                <div className="ml-auto font-medium">{formatDateOfBirth(item.createdAt.toISOString())}</div>
                            </Link>
                        ) : (
                            <div key={i} className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarFallback>{initial}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">{item.patientName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.appointmentId}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">GHS {item.totalAmount.toLocaleString()}</div>
                                <div className="ml-auto font-medium">{formatDateOfBirth(item.createdAt.toISOString())}</div>
                            </div>
                        )}
                    </>
                )
            })}
        </CardContent>
    </Card>
  )
}

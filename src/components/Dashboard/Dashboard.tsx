import Link from "next/link"
import {
    ArrowUpRight,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DoctorAnalyticsProps, getAdminAnalytics } from "../../../actions/stats"
import AnalyticsCard from "../AnalyticsCard"
import {Session} from "next-auth"
import { getDoctors } from "../../../actions/users"
import { Doctor } from "../../../types/types"
import { generateInitials } from "@/utils/generateInitials"

export const description = "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image."

export default async function Dashboard({session}: {session: Session | null}) {
    const user = session?.user
    const analytics = (await getAdminAnalytics()) || []
    const doctors = await getDoctors()

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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
                    <div className="flex justify-between items-center px-2">
                        <CardHeader >
                            <CardTitle>Recent Doctors</CardTitle>
                        </CardHeader>
                        <Button asChild variant={"outline"} className="ml-auto">
                            <Link href={`/dashboard/doctors`} className="text-xs">View All</Link>
                        </Button>
                    </div>
                    <CardContent className="grid gap-8">
                        {doctors?.slice(0, 5).map((doctor: Doctor) => {
                            return (
                                <div key={doctor.id} className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src={doctor.doctorProfile?.profilePicture ?? ""} alt="Avatar" />
                                        <AvatarFallback>{generateInitials(doctor.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            {doctor.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {doctor.email}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        <Button>Approve</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-5">
                    <div className="flex justify-between items-center px-2">
                        <CardHeader >
                            <CardTitle>Recent Patients</CardTitle>
                        </CardHeader>
                        <Button asChild variant={"outline"} className="ml-auto">
                            <Link href={`/dashboard/patients`} className="text-xs">View All</Link>
                        </Button>
                    </div>
                    <CardContent className="grid gap-8">
                        {doctors?.slice(0, 5).map((doctor: Doctor) => {
                            return (
                                <div key={doctor.id} className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src={doctor.doctorProfile?.profilePicture ?? ""} alt="Avatar" />
                                        <AvatarFallback>{generateInitials(doctor.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            {doctor.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {doctor.email}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        <Button>Approve</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

"use client"

import { AlarmClock, Angry, Bell, DollarSign, HeartPulse, Home, LayoutGrid, Mail, Pencil, Power, ScanHeart, Settings, UserPen, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function Sidebar({session}: {session: Session}) {
    const {user} = session
    const role = user?.role
    const pathname = usePathname()
    const router = useRouter()

    async function handleLogout() {
        await signOut()
        router.push("/login")
    }

    const roles = {
        USER: [
            {
                title: "Dashboard", path: "/dashboard", icon: Home
            },
            {
                title: "My Appointments", path: "/dashboard/user/appointments", icon: AlarmClock
            },
            {
                title: "Doctors", path: "/dashboard/user/doctors", icon: UserPen
            },
            {
                title: "Inbox", path: "/dashboard/user/inbox", icon: Mail
            },
            {
                title: "Settings", path: "/dashboard/user/settings", icon: Settings
            },
        ],

        ADMIN: [
            {
                title: "Dashboard", path: "/dashboard", icon: Home
            },
            {
                title: "Services", path: "/dashboard/services", icon: LayoutGrid
            },
            {
                title: "Specialties", path: "/dashboard/specialties", icon: ScanHeart
            },
            {
                title: "Symptoms", path: "/dashboard/symptoms", icon: Angry
            },
            {
                title: "Doctors", path: "/dashboard/doctors", icon: UserPen
            },
            {
                title: "Patients", path: "/dashboard/patients", icon: Users
            },
            {
                title: "Appointments", path: "/dashboard/appointments", icon: AlarmClock
            },
            {
                title: "Sales", path: "/dashboard/doctor/sales", icon: DollarSign
            },
            {
                title: "Settings", path: "/dashboard/settings", icon: Settings
            },
        ],

        DOCTOR: [
            {
                title: "Dashboard", path: "/dashboard", icon: Home
            },
            {
                title: "Appointments", path: "/dashboard/doctor/appointments", icon: AlarmClock
            },
            {
                title: "Sales", path: "/dashboard/doctor/sales", icon: DollarSign
            },
            {
                title: "Patients", path: "/dashboard/doctor/patients", icon: Users
            },
            {
                title: "Inbox", path: "/dashboard/doctor/inbox", icon: Mail
            },
            {
                title: "Compose Mail", path: "/dashboard/doctor/compose", icon: Pencil
            },
            {
                title: "Settings", path: "/dashboard/doctor/settings", icon: Settings
            },
        ]
    }

    const sideBarLinks = roles[role] || []

    return (
        <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <HeartPulse className="h-6 w-6" />
                            <span className="">PriMed Inc</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {
                                sideBarLinks.map((item, index) => {
                                    const Icon = item.icon
                                    return (
                                        <Link key={index} href={item.path} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname === item.path ? "bg-muted text-primary" : "")}>
                                            <Icon className="h-4 w-4" />
                                            {item.title}
                                            {/* {item.badgeCount && (
                                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                                    {item.badgeCount}
                                                </Badge>
                                            )} */}
                                        </Link>
                                    )
                                })
                            }
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Button size="sm" className="w-full" onClick={() => handleLogout()}>
                            <Power className="w-4 h-4 mr-1" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
    );
}
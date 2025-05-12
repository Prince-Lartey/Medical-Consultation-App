import { prismaClient } from "@/lib/db";
import { AlarmClock, LucideIcon, Mail, Users } from "lucide-react";

export type DoctorAnalyticsProps = {
    title: string;
    count: number;
    icon: LucideIcon
    unit: string;
    detailLink: string;
}

export async function getStats() {
    try {
        const serviceCount = await prismaClient.service.count();
        const doctorCount = await prismaClient.doctorProfile.count();

        const stats = {
            doctors: doctorCount.toString().padStart(2, "0"),
            patients: "00",
            appointments: "00",
            services: serviceCount.toString().padStart(2, "0"),
        }

        return stats
    } catch (error) {
        console.error("Error fetching services:", error);
        return {
            doctors: null,
            patients: null,
            appointments: null,
            services: null,
        };
    }
}

export async function getDoctorAnalytics() {
    try {
        const analytics = [
            {
                title: "Appointments",
                count: 1000,
                icon: AlarmClock,
                unit: "",
                detailLink: "/dashboard/doctor/appointments"
            },
            {
                title: "Patients",
                count: 1000,
                icon: Users,
                unit: "",
                detailLink: "/dashboard/doctor/patients"
            },
            {
                title: "Inbox",
                count: 1000,
                icon: Mail,
                unit: "",
                detailLink: "/dashboard/doctor/sales"
            },
        ]

        return analytics as DoctorAnalyticsProps[]
    } catch (error) {
        console.error("Error fetching services:", error);
        return []
    }
}
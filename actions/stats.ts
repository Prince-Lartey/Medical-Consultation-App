import { prismaClient } from "@/lib/db";
import { AlarmClock, LucideIcon, Mail, Users } from "lucide-react";
import { getDoctorAppointments } from "./appointments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Appointment } from "@prisma/client";

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
        const session = await getServerSession(authOptions)
        const user = session?.user

        const appointments = (await getDoctorAppointments(user?.id ?? ""))

        const uniquePatientsMap = new Map()
            
        appointments.forEach((appointment: Appointment) => {
            if(!uniquePatientsMap.has(appointment.patientId)) {
                uniquePatientsMap.set(appointment.patientId, {
                    patientId: appointment.patientId,
                    name: `${appointment.firstName} ${appointment.lastName}`,
                    email: appointment.email,
                    phone: appointment.phone,
                    location: appointment.location,
                    gender: appointment.gender,
                    occupation: appointment.occupation,
                    dob: appointment.dob,
                })
            }
        })
        const patients = Array.from(uniquePatientsMap.values())
        
        const analytics = [
            {
                title: "Appointments",
                count: appointments.length ?? 0,
                icon: AlarmClock,
                unit: "",
                detailLink: "/dashboard/doctor/appointments"
            },
            {
                title: "Patients",
                count: patients.length ?? 0,
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
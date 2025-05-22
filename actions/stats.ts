import { prismaClient } from "@/lib/db";
import { AlarmClock, DollarSign, LayoutGrid, LucideIcon, Mail, UserPen, Users } from "lucide-react";
import { getAppointments, getDoctorAppointments, getPatientAppointments } from "./appointments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Appointment } from "@prisma/client";
import { getInboxMessage } from "./inbox";
import { getDoctors } from "./users";
import { getServices } from "./services";
import { getDoctorSales } from "./sales";

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
        const messages = (await getInboxMessage(user!.id)).data
        const sales = (await getDoctorSales(user!.id)).data
        
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
                count: messages.length ?? 0,
                icon: Mail,
                unit: "",
                detailLink: "/dashboard/doctor/inbox"
            },
            {
                title: "Sales",
                count: messages.length ?? 0,
                icon: DollarSign,
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

export async function getUserAnalytics() {
    try {
        const session = await getServerSession(authOptions)
        const user = session?.user

        const appointments = (await getPatientAppointments(user?.id ?? ""))

        const uniquePatientsMap = new Map()
            
        appointments.forEach((appointment: Appointment) => {
            if(!uniquePatientsMap.has(appointment.doctorId)) {
                uniquePatientsMap.set(appointment.doctorId, {
                    doctorId: appointment.doctorId,
                    name: appointment.doctorName,
                })
            }
        })
        const doctors = Array.from(uniquePatientsMap.values())
        const messages = (await getInboxMessage(user!.id)).data
        
        const analytics = [
            {
                title: "Appointments",
                count: appointments.length ?? 0,
                icon: AlarmClock,
                unit: "",
                detailLink: "/dashboard/user/appointments"
            },
            {
                title: "Doctors",
                count: doctors.length ?? 0,
                icon: UserPen,
                unit: "",
                detailLink: "/dashboard/user/doctors"
            },
            {
                title: "Inbox",
                count: messages.length ?? 0,
                icon: Mail,
                unit: "",
                detailLink: "/dashboard/user/inbox"
            },
        ]

        return analytics as DoctorAnalyticsProps[]
    } catch (error) {
        console.error("Error fetching services:", error);
        return []
    }
}

export async function getAdminAnalytics() {
    try {
        const session = await getServerSession(authOptions)
        const user = session?.user

        const appointments = (await getAppointments())
        const doctors = await getDoctors()
        const services = (await getServices()).data

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
                title: "Doctors",
                count: doctors.length ?? 0,
                icon: UserPen,
                unit: "",
                detailLink: "/dashboard/doctors"
            },
            {
                title: "Patients",
                count: patients.length ?? 0,
                icon: Users,
                unit: "",
                detailLink: "/dashboard/patients"
            },
            {
                title: "Appointments",
                count: appointments.length ?? 0,
                icon: AlarmClock,
                unit: "",
                detailLink: "/dashboard/appointments"
            },
            {
                title: "Services",
                count: services.length ?? 0,
                icon: LayoutGrid,
                unit: "",
                detailLink: "/dashboard/services"
            },
        ]

        return analytics as DoctorAnalyticsProps[]
    } catch (error) {
        console.error("Error fetching services:", error);
        return []
    }
}
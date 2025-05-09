"use server"

import { prismaClient } from "@/lib/db";
import { AppointmentProps } from "../types/types";
import { revalidatePath } from "next/cache";
import { AppointmentUpdateProps } from "@/components/Dashboard/Doctor/UpdateAppointmentForm";
import {Resend} from "resend"
import NewAppointmentEmail from "@/components/Emails/new-appointment-email";
import { AppointmentStatusEmail } from "@/components/Emails/appointment-status-email";

const resend = new Resend(process.env.RESEND_API_KEY)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function createAppointment(data: AppointmentProps) {
    const doctor = await prismaClient.user.findUnique({
        where: {
            id: data.doctorId,
        },
    });

    try {
        const newAppointment = await prismaClient.appointment.create({
            data,
        });
        const firstName = doctor.name
        const email = doctor.email
        const link = `${baseUrl}/dashboard/doctor/appointments/view/${newAppointment.id}`;
        const message = "You have a new appointment scheduled. Please review and approve it by clicking the button below.";

        await resend.emails.send({
            from: "PriMed <info@pricorp.info>",
            to: email,
            subject: "New Appointment",
            react: NewAppointmentEmail({ firstName, link, message }),
        });
        revalidatePath("/dashboard/doctor/appointments");

        return {
            data: newAppointment,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error creating appointment:", error);
        return {
            data: null,
            error: "An error occurred while creating the appointment",
            status: 500,
        };
    }
}

export async function getAppointments() {
    try {
        const appointments = await prismaClient.appointment.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return appointments
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return []
    } 
}

export async function getPatientAppointments(patientId: string) {
    try {
        const appointments = await prismaClient.appointment.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                patientId,
            },
        });
        return appointments
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return []
    } 
}

export async function getFirstPatientAppointmentsById(patientId: string | undefined) {
    if (patientId) {
        try {
            const appointment = await prismaClient.appointment.findFirst({
                where: {
                    patientId,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return appointment
        } catch (error) {
            console.error("Error fetching appointments:", error);
            return null
        }
    }
}

export async function getDoctorAppointments(doctorId: string) {
    try {
        const appointments = await prismaClient.appointment.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                doctorId,
            },
        });
        return appointments
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return []
    } 
}

export async function deleteAppointment(id: string) {
    try {
        await prismaClient.appointment.delete({
            where: {
                id,
            },
        });
        revalidatePath("/dashboard/doctor/appointments");

        return {
            ok: true,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return {
            data: null,
            error: "An error occurred while deleting the appointment",
            status: 500,
        };
    }
}

export async function getAppointmentById(id: string) {
    try {
        if (id) {
            const appointment = await prismaClient.appointment.findUnique({
                where: {
                    id,
                },
            });
            return appointment
        }else {
            return null
        }

    } catch (error) {
        console.error("Error fetching appointment:", error);
    }
}

export async function updateAppointment(id: string, data: AppointmentProps) {
    try {
        const updatedAppointment = await prismaClient.appointment.update({
            where: {
                id,
            },
            data,
        });
        revalidatePath("/dashboard/doctor/appointments");

        return {
            data: updatedAppointment,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error updating Appointment:", error);
        return {
            data: null,
            error: "An error occurred while updating the Appointment",
            status: 500,
        };
    }
}

export async function updateAppointmentById(id: string, data: AppointmentUpdateProps) {
    try {
        const updatedAppointment = await prismaClient.appointment.update({
            where: {
                id,
            },
            data,
        });
        const patientId = updatedAppointment.patientId
        const patient = await prismaClient.user.findUnique({
            where: {
                id: patientId,
            },
        });
        const firstName = patient.name
        const email = patient.email
        const link = `${baseUrl}/dashboard/user/appointments/view/${updatedAppointment.id}`;
        const message = "We wish to inform you that the status of your appointment has been updated by the attending doctor. Kindly click the button below to review the updated details.";

        await resend.emails.send({
            from: "PriMed <info@pricorp.info>",
            to: email,
            subject: "Update on Your Appointment Status",
            react: AppointmentStatusEmail({ firstName, link, message }),
        });
        revalidatePath("/dashboard/doctor/appointments");

        return {
            data: updatedAppointment,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error updating Appointment:", error);
        return {
            data: null,
            error: "An error occurred while updating the Appointment",
            status: 500,
        };
    }
}
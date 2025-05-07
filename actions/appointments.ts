"use server"

import { prismaClient } from "@/lib/db";
import { AppointmentProps } from "../types/types";
import { revalidatePath } from "next/cache";

export async function createAppointment(data: AppointmentProps) {
    try {

        const newAppointment = await prismaClient.appointment.create({
            data,
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
            return {
                data: appointment,
                error: null,
                status: 200,
            };
        }else {
            return {
                data: null,
                error: "Appointment ID is required",
                status: 400,
            };
        }

    } catch (error) {
        console.error("Error fetching appointment:", error);
        return {
            data: null,
            error: "An error occurred while fetching the appointment",
            status: 500,
        };
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
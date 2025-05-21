"use server"

import { prismaClient } from "@/lib/db"
import { revalidatePath } from "next/cache"

export interface SaleProps {
    appointmentId: string
    doctorId: string
    doctorName: string
    patientId: string
    patientName: string
    totalAmount: number
}

export async function CreateSale(data: SaleProps) {
    try {
        const sale = await prismaClient.sale.create({
            data
        })
        revalidatePath("dashboard/doctor/sales")
        return sale
    } catch (error) {
        console.log(error)
    }
}
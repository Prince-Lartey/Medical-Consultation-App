"use server"

import { prismaClient } from "@/lib/db";
import { ServiceProps } from "../types/types";
import { revalidatePath } from "next/cache";

export async function createService(data: ServiceProps) {
    const { title, imageUrl, slug } = data;
    try {
        const existingService = await prismaClient.service.findUnique({
            where: {
                slug,
            },
        });
        if (existingService) {
            return {
                data: null,
                error: `Service with this slug ( ${slug})  already exists in the Database`,
                status: 409,
            };
        }

        const newService = await prismaClient.service.create({
            data: {
                title,
                imageUrl,
                slug,
            },
        });
        revalidatePath("/dashboard/services");

        return {
            data: newService,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error creating service:", error);
        return {
            data: null,
            error: "An error occurred while creating the service",
            status: 500,
        };
    }
}

export async function getServices() {
    try {
        const services = await prismaClient.service.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return {
            data: services,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error fetching services:", error);
        return {
            data: null,
            error: "An error occurred while fetching the services",
            status: 500,
        };
    }
}